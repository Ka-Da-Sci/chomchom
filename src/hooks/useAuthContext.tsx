import { useContext } from "react";
import { context } from "@/context/AuthContext";

export const useAuthContext = () => {
    const contextValue = useContext(context);
    if (!contextValue) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return contextValue;
};