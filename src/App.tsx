import { Route, Routes } from "react-router-dom";
import HomePage from "./components/routes/home/Index";
import SingleImage from './components/routes/SingleImage';
import "./styles/globals.css";
import { useEffect, useContext } from "react";
import { miscContext } from "./context/FileManagementContext";
// import useSupabaseSession from "./hooks/useSupabaseSession";
import { useAuthContext } from "./hooks/useAuthContext";
import supabase from "./lib/supabase.config";
import PrivateGallery from "./components/routes/PrivateGallery";
import NotFound from "./components/routes/NotFound";

/* eslint-disable no-console */
const App = () => {
  const context = useContext(miscContext);
  const { session, setSession } = useAuthContext();

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
      {session && (<Route element={<PrivateGallery />} path={'/my-chommie-stocks'} />)}
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};

export default App;
