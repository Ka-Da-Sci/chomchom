import { useEffect, useState } from "react";
import DefaultGallery from "@/components/layouts/DefaultGallery";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button, Spinner } from "@heroui/react";
import authenticateUser from "@/handlers/supabase-authentication";
import { useNavigate } from "react-router-dom";
import useAssignAccessLevel from "@/hooks/useAssignAccessLevel";
import useFileManagementContext from "@/hooks/useFileManagementContext";

/* eslint-disable no-console */
const ProfilePageUploads = () => {
  useAssignAccessLevel("private");
  const navigate = useNavigate();
  const { signInWithGooglePopup } = authenticateUser;
  const { session } = useAuthContext();

  const {
    state: contextState,
    setIsLoading,
    isLoading,
    contextLoaded,
    setToggleForm,
  } = useFileManagementContext();

  const [myStocks, setMyStocks] = useState<
    Array<{
      id: string | number | null;
      title: string;
      path: string;
      file: File | null;
      user_name: string;
      user_fullnames: string;
      created_at: string;
    }>
  >([]);

  useEffect(() => {
    if (!session) return;

    setIsLoading(true);
    const userUserName = session?.user?.email?.split("@")[0].toLowerCase();
    const updatedStocksCollection = contextState.items.filter((item) => {
      return item.user_name === userUserName;
    });
    
    console.log(" Yeahhhhhhhhhhhhhhhhhhh: ", updatedStocksCollection)
    setMyStocks(updatedStocksCollection);
    setIsLoading(false);
  }, [contextState.items, session]);

  if (!session) {
    return (
      <DefaultLayout>
        <div className="flex flex-col gap-8 justify-center items-center h-3/4 max-h-screen">
          <h1>You must be logged in!</h1>
          <Button
            className="capitalize px-8 font-poppins"
            onPress={async () => {
              await signInWithGooglePopup();
            }}
          >
            Sign in
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  // Show loading state while waiting for data (Using HeroUI Spinner)
  if (isLoading || !contextLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <section className="mb-10 flex flex-col justify-center items-center gap-6 w-full">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-left w-full text-default-500 text-xl md:text-2xl font-semibold font-montserrat antialiased">
          Uploads
        </h1>
        <Button
          className="bg-white border border-solid border-primary-500 px-6 text-default-500 font-semibold font-montserrat"
          onPress={() => {
            setToggleForm(true);
            navigate("/my-chommie-stocks");
          }}
        >
          Add New Photo
        </Button>
      </div>
      <DefaultGallery items={myStocks} />
    </section>
  );
};

export default ProfilePageUploads;
