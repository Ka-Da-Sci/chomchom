import { Session, AuthError } from "@supabase/supabase-js";
import React, { createContext, useState } from "react";

interface AuthContextType {
    session: any;
    setSession: React.Dispatch<React.SetStateAction<any>>;
}

const initialValue: AuthContextType = {
    session: null,
    setSession: () => null,
};

export const context = createContext<AuthContextType>(initialValue);

// /* eslint-disable no-console */

const AuthContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [session, setSession] = useState<{ data: { session: Session | null }; error: AuthError | null } | null>(null);
    // const [data, setData] = useState(null);


    return (
        <context.Provider value={{session, setSession}}>
            {children}
        </context.Provider>
    )
}

export default React.memo(AuthContextProvider);