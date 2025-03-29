import { useEffect, useState } from "react";
import DefaultGallery from "@/components/layouts/DefaultGallery";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Spinner } from "@heroui/react";
import Upload from "../ui/Upload";
import useAssignAccessLevel from "@/hooks/useAssignAccessLevel";
import useFileManagementContext from "@/hooks/useFileManagementContext";
import { StockItemsColumnTypes } from "@/types/utilityTypes";
import { useNavigate } from "react-router-dom";


/* eslint-disable no-console */
const PrivateGallery = () => {
    useAssignAccessLevel('private');
  const navigate = useNavigate();
  const { session } = useAuthContext(); 

  const {
    state: contextState,
    setIsLoading,
    isLoading,
    contextLoaded,
  } = useFileManagementContext();

  const [myStocks, setMyStocks] = useState<
    Array<StockItemsColumnTypes>
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
  if (!session && contextLoaded) {
    navigate("/login");
    return null;
  };

  return (
    <DefaultLayout>
      <section className="flex justify-center pt-4">
        <Upload />
      </section>
      <section className="pb-8">
        <div className="mt-4 mb-8 flex flex-col justify-center items-center gap-6">
          <p className="self-start font-inter font-medium text-left text-sm sm:text-base">You have {myStocks.length} Fotox.</p>
          <DefaultGallery items={myStocks} />
        </div>
      </section>
    </DefaultLayout>
  );
};

export default PrivateGallery;
