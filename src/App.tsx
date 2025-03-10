import { Route, Routes } from "react-router-dom";
import PublicGallery from "./components/routes/Index";
import SingleItemGallery from "./components/routes/SingleIItemGallery";
import "./styles/globals.css";
import { useEffect, useState } from "react";
// import useSupabaseSession from "./hooks/useSupabaseSession";
import { useAuthContext } from "./hooks/useAuthContext";
import supabase from "./lib/supabase.config";
import PrivateGallery from "./components/routes/PrivateGallery";
import NotFound from "./components/routes/NotFound";
import Profile from "./components/routes/Profile";
import { realtimeDatabaseSubscription } from "./lib/supabase.config";
import useFileManagementContext from "./hooks/useFileManagementContext";

/* eslint-disable no-console */
const App = () => {
  const { readDatabaseItems, state, dispatch } = useFileManagementContext();
  const { setSession } = useAuthContext();
  const [latestUpdatedItem, setLatestupdatedItem] = useState<{id: any}>({ id: '' });
  const [latestChangeType, setLatestChangeType] = useState("");
  const [latestUpdatedItemId, setLatestUlatestUpdatedItemId] = useState();

  const handleRealtimeUpdate = (payloadData: any) => {
    const updatedItem = payloadData.new;
    setLatestupdatedItem(updatedItem);
    setLatestChangeType(payloadData.eventType);
    setLatestUlatestUpdatedItemId(payloadData.old.id);
  };
  
  

  useEffect(() => {
    realtimeDatabaseSubscription("stocks", handleRealtimeUpdate);
    readDatabaseItems().then(() => console.log(state.items));
  }, []);

  useEffect(() => {
    
    let updatedStateItems;

    switch (latestChangeType) {
      case "INSERT":
        updatedStateItems = [...state.items, latestUpdatedItem];
        break;
    
      case "DELETE":
        updatedStateItems = state.items.filter(item => item.id !== latestUpdatedItemId);
        break;
    
      case "UPDATE":
        updatedStateItems = state.items.map(item =>
          item.id === latestUpdatedItemId ? latestUpdatedItem : item
        );
        break;
    
      default:
        console.log("May Day! May Day! May Day!");
        console.log(latestChangeType);
    }    
  
    console.log("Updated item:", latestUpdatedItem);
    console.log("Updated state items:", updatedStateItems);
  
    dispatch({
      type: "setItems",
      payload: { many: updatedStateItems },
    });
  }, [latestUpdatedItem])

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      setSession(session);
    };

    getSession();
    return () => setSession(null);
  }, [setSession]);

  {
    /* {session && (<Route element={<PrivateGallery />} path={'/my-chommie-stocks'} />)} */
  }
  return (
    <Routes>
      <Route element={<PublicGallery />} path={"/"} />
      <Route element={<SingleItemGallery />} path={"/image/:id"} />
      <Route element={<PrivateGallery />} path={"/my-chommie-stocks"} />
      <Route element={<Profile />} path="/profile" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};

export default App;
