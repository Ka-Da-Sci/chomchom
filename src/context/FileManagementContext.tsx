import { createContext, useReducer } from "react";
import SupaBaseDataBase from "@/handlers/supadatabase";
const { readDocs} = SupaBaseDataBase;

type State = {
  input: { title: string | null; file: File | null; path: string | null };
  items: { id: number | string | null; title: string; path: string; file: File | null; user_name: string; user_fullnames: string; created_at: string }[];
};

type Action = {
  type: string;
  payload: any;
};

type MiscContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  readDatabaseItems: any;
}

export const miscContext = createContext<MiscContextType | null>(null);


const initialState = {
  input: { id: null, title: null, file: null, path: null, user_name: "", user_fullnames: "", created_at: ""},
  items: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setInput":
      return { ...state, input: { ...action.payload } };
    case "setItemsFromDb":
      return { ...state, items: [...action.payload.items] };
    case "setItems":
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

// /* eslint-disable no-console */
const ContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const readDatabaseItems = async () => {
    const items = await readDocs('stocks');
    dispatch({ type: "setItemsFromDb", payload: { items } });
  }
  return (
    <miscContext.Provider value={{ state, dispatch, readDatabaseItems }}>{children}</miscContext.Provider>
  );
};

export default ContextProvider;
