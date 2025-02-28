import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/home/Index";
import "./styles/globals.css";
import { useEffect, useContext } from "react";
import { miscContext } from "./context/FileManagementContext";
// import useSupabaseSession from "./hooks/useSupabaseSession";
import { useAuthContext } from "./hooks/useAuthContext";
import supabase from "./lib/supabase.config";

/* eslint-disable no-console */
const App = () => {
  const context = useContext(miscContext);
  const { setSession } = useAuthContext();

  useEffect(() => {
    if (context) {
      const { readDatabaseItems, state } = context;
      readDatabaseItems().then(() => console.log(state.items));
    }
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log(session);
      setSession(session);
    };

    getSession();
    return () => setSession(null);
  }, [setSession]);

  return (
    // <div>
    //   {!supabaseSession ? (
    //     <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    //   ) : (
    //     <div>Logged in!</div>
    //     // <Route element={<HomePage />} path={"/"} />
    //   )}
    // </div>
    <Routes>
      <Route element={<HomePage />} path={"/"} />
    </Routes>
  );
};

export default App;
