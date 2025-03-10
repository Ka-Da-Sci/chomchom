import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFileManagementContext from "./useFileManagementContext";


const useAssignAccessLevel = (accessLevel: string) => {
    const { pathname } = useLocation();
    const { setAccess } = useFileManagementContext();

    useEffect(() => {
        const assignAccess = () => setAccess(accessLevel);
        assignAccess();
    
        return () => setAccess('');
      }, [pathname])

    // return accessLevel;
}

export default useAssignAccessLevel;
