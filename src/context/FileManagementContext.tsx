import { createContext, useReducer, useState } from "react";
import SupaBaseDataBase from "@/handlers/supadatabase";
import { StockItemsColumnTypes } from "@/types/utilityTypes";

/* eslint-disable no-console */

type State = {
  input: { title: string | null; file: File | null; path: string | null };
  items: StockItemsColumnTypes[];
  placeholderItems: StockItemsColumnTypes[];
};

type Action = {
  type: string;
  payload: any;
};

type MiscContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
  readDatabaseItems: any;
  contextLoaded: boolean;
  setContextLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  searchItems: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: boolean;
  setToggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  access: string;
  setAccess: React.Dispatch<React.SetStateAction<string>>;
};

export const miscContext = createContext<MiscContextType | null>(null);
const { readDocs } = SupaBaseDataBase;

const initialState = {
  input: {
    id: null,
    title: null,
    file: null,
    path: null,
    user_name: "",
    user_fullnames: "",
    created_at: "",
  },
  items: [],
  placeholderItems: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setInput":
      return { ...state, input: { ...action.payload } };
    case "setItemsFromDb":
      return {
        ...state,
        items: [...action.payload.items],
        placeholderItems: [...action.payload.items],
      };
    case "setItems":
      if (action.payload.many){
        console.log("Updated state items:", action.payload.many);
        return {
          ...state,
          items: [...action.payload.many],
          placeholderItems: [...action.payload.many],
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "setSearchResults":
      return { ...state, items: [...action.payload] };
    default:
      return state;
  }
};

// /* eslint-disable no-console */
const ContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [toggleForm, setToggleForm] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [contextLoaded, setContextLoaded] = useState(false); // Check if context is populated
  const [access, setAccess] = useState('');

  const readDatabaseItems = async () => {
    const items = await readDocs("safe_stocks");
    dispatch({ type: "setItemsFromDb", payload: { items } });
    setContextLoaded(true);
  };

  /* eslint-disable no-console */
  const searchItems = (searchInput: string): void => {
    console.log(searchInput.trim() === "", !searchInput);
    if (searchInput.trim() === "" || !searchInput) {
      dispatch({ type: "setSearchResults", payload: [...state.placeholderItems] });
      return;
    }

    const searchInputText = searchInput.trim().toLowerCase();
    const searchList = state.placeholderItems.flat();
    console.log(searchList.length);
    const searchResult = searchList.filter((searchItem: StockItemsColumnTypes) => {
      if (typeof searchItem.title === "string") {
        const searchItemTitle = searchItem.title.toLowerCase();
        return searchItemTitle.indexOf(searchInputText) > -1;
      }
      return false;
    });

    dispatch({
      type: "setSearchResults",
      payload: [ ...searchResult ],
    });
  };
  return (
    <miscContext.Provider
      value={{
        toggleForm,
        setToggleForm,
        state,
        dispatch,
        readDatabaseItems,
        searchItems,
        contextLoaded,
        setContextLoaded,
        isLoading,
        setIsLoading,
        access,
        setAccess
      }}
    >
      {children}
    </miscContext.Provider>
  );
};

export default ContextProvider;
