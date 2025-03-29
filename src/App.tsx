import { Route, Routes } from "react-router-dom";
import "./styles/globals.css";
import { useEffect, useState, lazy, Suspense } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import supabase from "./lib/supabase.config";
import { realtimeDatabaseSubscription } from "./lib/supabase.config";
import useFileManagementContext from "./hooks/useFileManagementContext";
import { Spinner } from "@heroui/react";
import ThirdPartyUserPublicProfile from "./components/routes/ThirdPartyUserPublicProfile";
import SignUpSignIn from "./components/routes/SignUpSignIn";
const PublicGallery = lazy(() => import("./components/routes/Index"));
// import PublicGallery from "./components/routes/Index";


const PrivateGallery = lazy(() => import("./components/routes/PrivateGallery"));
const NotFound = lazy(() => import("./components/routes/NotFound"));
const Profile = lazy(() => import("./components/routes/Profile"));

const SingleItemGallery = lazy(
  () => import("./components/routes/SingleIItemGallery")
);

/* eslint-disable no-console */
const App = () => {
  const { readDatabaseItems, state, dispatch, setContextLoaded } =
    useFileManagementContext();
  const { setSession } = useAuthContext();
  const [latestUpdatedItem, setLatestupdatedItem] = useState<{ id: any }>({
    id: "",
  });
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
        updatedStateItems = [latestUpdatedItem, ...state.items];
        break;

      case "DELETE":
        updatedStateItems = state.items.filter(
          (item) => item.id !== latestUpdatedItemId
        );
        break;

      case "UPDATE":
        updatedStateItems = state.items.map((item) =>
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
    <Suspense fallback={<Spinner className="container m-auto flex flex-col justify-center items-center" />}>
      <Routes>
        <Route element={<PublicGallery />} path={"/"} />
        <Route element={<SingleItemGallery />} path={"/fotox/:id/"} />
        <Route element={<PrivateGallery />} path={"/my-fotox/"} />
        <Route element={<Profile />} path="/profile/me/" />
        <Route element={<SignUpSignIn />} path="/login" />
        <Route element={<ThirdPartyUserPublicProfile />} path={"/profile/user/:userId"} />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Suspense>
  );
};

export default App;
