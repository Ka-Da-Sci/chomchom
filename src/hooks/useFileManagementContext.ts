import { useContext } from "react";
import { miscContext } from "@/context/FileManagementContext";


const useFileManagementContext = () => {
    const miscContextValue = useContext(miscContext);
    if (!miscContextValue) {
      throw new Error("miscContext must be used within a Provider");
    }

    return miscContextValue;
}

export default useFileManagementContext;
