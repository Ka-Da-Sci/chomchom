import { Route, Routes } from "react-router-dom";
import PublicGallery from "./components/routes/Index";
import SingleItemGallery from "./components/routes/SingleIItemGallery";
import "./styles/globals.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import supabase from "./lib/supabase.config";
import PrivateGallery from "./components/routes/PrivateGallery";
import NotFound from "./components/routes/NotFound";
import Profile from "./components/routes/Profile";
import { realtimeDatabaseSubscription } from "./lib/supabase.config";
import useFileManagementContext from "./hooks/useFileManagementContext";

/* eslint-disable no-console */
const App = () => {
  const { readDatabaseItems, state, dispatch, setContextLoaded } = useFileManagementContext();
  const { setSession } = useAuthContext();
  const [latestUpdatedItem, setLatestupdatedItem] = useState<{ id: any }>({ id: '' });
  const [latestChangeType, setLatestChangeType] = useState("");
  const [latestUpdatedItemId, setLatestUlatestUpdatedItemId] = useState();

  // Handle real-time updates and dispatch changes
  const handleRealtimeUpdate = (payloadData: any) => {
    const updatedItem = payloadData.new;
    setLatestupdatedItem(updatedItem);
    setLatestChangeType(payloadData.eventType);
    setLatestUlatestUpdatedItemId(payloadData.old.id);

    
  };

  // Fetch the session on mount and set session in context
  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Session:", session);
        setSession(session);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    getSession();
    return () => setSession(null); // Cleanup session on unmount
  }, [setSession]);

  // Fetch data and subscribe to real-time updates
  useEffect(() => {
    realtimeDatabaseSubscription("stocks", handleRealtimeUpdate);

    readDatabaseItems().then(() => {
      console.log("Fetched items:", state.items);
    });
  }, []);

  // Handle changes to state.items based on real-time updates
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
        console.log("Unhandled event type:", latestChangeType);
    }

    console.log("Updated item:", latestUpdatedItem);

    // Dispatch the updated state to the context
    dispatch({
      type: "setItems",
      payload: { many: updatedStateItems },
    });
    setContextLoaded(true);
  }, [latestUpdatedItem]);

  // Monitor state.items changes and log updated state
  useEffect(() => {
    console.log("State items updated:", state.items);
  }, [state.items]);

  return (
    <Routes>
      <Route element={<PublicGallery />} path={"/"} />
      <Route element={<SingleItemGallery />} path={"/image/:id/"} />
      <Route element={<PrivateGallery />} path={"/my-chommie-stocks/"} />
      <Route element={<Profile />} path="/profile/" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
};

export default App;

