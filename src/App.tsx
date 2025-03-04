import { Route, Routes } from "react-router-dom";
import HomePage from "./components/routes/home/Index";
import SingleImage from './components/routes/SingleImage';
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
    <Routes>
      <Route element={<HomePage />} path={"/"} />
      <Route element={<SingleImage />} path={"/image/:id"} />
    </Routes>
  );
};

export default App;
