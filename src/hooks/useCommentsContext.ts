import { useContext } from "react";
import { commentsContext } from "@/context/CommentsContext";

const useCommentsContext = () => {
    const contextValue = useContext(commentsContext);
    if (!contextValue) {
        throw new Error("useCommentsContext must be used within a CommentsContextProvider.");
    };

    return contextValue;
};

export default useCommentsContext;
