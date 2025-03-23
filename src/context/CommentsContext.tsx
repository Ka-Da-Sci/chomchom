import React, { useReducer, createContext } from "react";
import { CommentsTableColumnTypes } from "@/types/utilityTypes";

// /* eslint-disable no-console */

type Action = {
  type: string;
  payLoad: any;
};

type State = {
  postId?: number;
  comments?: CommentsTableColumnTypes[];
};

type CommentsContextType = {
  commentsContextState: State;
  dispatch: React.Dispatch<Action>;
};

const initialState: State = {
  postId: undefined,
  comments: [],
};
export const commentsContext = createContext<CommentsContextType | null>(null);
// export const commentsContext = createContext(initialState);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setPostId":
        // console.log(action.payLoad);
        // debugger;
      return { ...state, postId: action.payLoad };
    case "setComments":
        // console.log(action.payLoad);
        // debugger;
      return { ...state, comments: action.payLoad };
    default:
      return state;
  }
};

const CommentsCOntextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [commentsContextState, dispatch] = useReducer(reducer, initialState);



  const commentsContextValues = { commentsContextState, dispatch };
  return (
    <commentsContext.Provider value={commentsContextValues}>
      {" "}
      {children}{" "}
    </commentsContext.Provider>
  );
};

export default CommentsCOntextProvider;
