import { useContext, useEffect, useState } from "react";
import { miscContext } from "@/context/FileManagementContext";
import DefaultGallery from "@/components/layouts/DefaultGallery";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button, Spinner } from "@heroui/react";
import authenticateUser from "@/handlers/supabase-authentication";

// /* eslint-disable no-console */
const PrivateGallery = () => {
  const { signInWithGooglePopup } = authenticateUser;
  const { session } = useAuthContext();
  const context = useContext(miscContext);
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }
  const {
    state: contextState,
    setIsLoading,
    isLoading,
    contextLoaded,
  } = context;

  // Request is not logged in and attempt to access this route. 
  if (!session) {
    return (
      <DefaultLayout>
        <div className="flex flex-col gap-8 justify-center items-center h-  h-3/4 max-h-screen">
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

  const { user } = session;
  const userUserName = user?.email?.split("@")[0].toLowerCase();
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
    setIsLoading(true);
    const updatedStocksCollection = contextState.items.filter((item) => {
      return item.user_name === userUserName;
    });

    setMyStocks(updatedStocksCollection);
    setIsLoading(false);
  }, [contextState.items, userUserName]);

  // Show loading state while waiting for data (Using HeroUI Spinner)
  if (isLoading || !contextLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <DefaultLayout>
      <div className="mt-20 mb-10 flex flex-col justify-center items-center gap-6">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold font-montserrat antialiased">
          Personal Gallery
        </h1>
        <DefaultGallery items={[...myStocks]} />
      </div>
    </DefaultLayout>
  );
};

export default PrivateGallery;
