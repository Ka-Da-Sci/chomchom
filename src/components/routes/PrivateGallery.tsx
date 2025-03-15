import { useEffect, useState } from "react";
import DefaultGallery from "@/components/layouts/DefaultGallery";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button, Spinner } from "@heroui/react";
import authenticateUser from "@/handlers/supabase-authentication";
import Upload from "../ui/Upload";
import useAssignAccessLevel from "@/hooks/useAssignAccessLevel";
import useFileManagementContext from "@/hooks/useFileManagementContext";


/* eslint-disable no-console */
const PrivateGallery = () => {
    useAssignAccessLevel('private');
  const { signInWithGooglePopup } = authenticateUser;
  const { session } = useAuthContext(); 

  const {
    state: contextState,
    setIsLoading,
    isLoading,
    contextLoaded,
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
    if (!session) return; // ✅ Prevents unnecessary execution

    setIsLoading(true);
    const userUserName = session?.user?.email?.split("@")[0].toLowerCase();
    const updatedStocksCollection = contextState.items.filter(
      (item) => item.user_name === userUserName
    );

    setMyStocks(updatedStocksCollection);
    setIsLoading(false);
    console.log(updatedStocksCollection);
  }, [contextState.items, session]); 

  if ( session !== null && isLoading || !contextLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  // ✅ Handle case where user is not logged in AFTER hooks execution
  if (!session) {
    return (
      <DefaultLayout>
        <section>
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
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex justify-center">
        <Upload />
      </section>
      <section>
        <div className="mt-20 mb-10 flex flex-col justify-center items-center gap-6">
          <p className="self-start font-inter font-medium text-left text-sm sm:text-base">You have {myStocks.length} Fotox.</p>
          <DefaultGallery items={myStocks} />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default PrivateGallery;
