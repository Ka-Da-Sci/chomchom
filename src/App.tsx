import { Route, Routes } from "react-router-dom";
import PublicGallery from "./components/routes/Index";
import SingleItemGallery from './components/routes/SingleIItemGallery';
import "./styles/globals.css";
import { useEffect, useContext } from "react";
import { miscContext } from "./context/FileManagementContext";
// import useSupabaseSession from "./hooks/useSupabaseSession";
import { useAuthContext } from "./hooks/useAuthContext";
import supabase from "./lib/supabase.config";
import PrivateGallery from "./components/routes/PrivateGallery";
import NotFound from "./components/routes/NotFound";
import Profile from "./components/routes/Profile";

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

  {/* {session && (<Route element={<PrivateGallery />} path={'/my-chommie-stocks'} />)} */}
  return (
    <Routes>
      <Route element={<PublicGallery />} path={"/"} />
      <Route element={<SingleItemGallery />} path={"/image/:id"} />
      <Route element={<PrivateGallery />} path={'/my-chommie-stocks'} />
      <Route element={<Profile />} path="/profile"/>
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};

export default App;
