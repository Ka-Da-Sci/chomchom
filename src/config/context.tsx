import { createContext, useReducer } from "react";

type State = {
  input: { title: string | null; file: File | null; path: string | null };
  photoItems: { title: string; path: string; file: File | null }[];
};

type Action = {
  type: string;
  payload: any;
};

type MiscContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const miscContext = createContext<MiscContextType | null>(null);


const initialState = {
  input: { title: null, file: null, path: null },
  photoItems: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setInput":
      return { ...state, input: { ...action.payload } };
    case "setPhotoItems":
      return { ...state, photoItems: [...state.photoItems, action.payload] };
    default:
      return state;
  }
};

const ContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <miscContext.Provider value={{ state, dispatch }}>{children}</miscContext.Provider>
  );
};

export default ContextProvider;
