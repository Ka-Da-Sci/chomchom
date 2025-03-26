import { useEffect, useState } from "react";
import DefaultGallery from "@/components/layouts/DefaultGallery";
import { Spinner } from "@heroui/react";
import useAssignAccessLevel from "@/hooks/useAssignAccessLevel";
import useFileManagementContext from "@/hooks/useFileManagementContext";
import { useParams } from "react-router-dom";


/* eslint-disable no-console */
const OtherUserSpecificPublicGallery = () => {
    useAssignAccessLevel('public');
    const { userId } = useParams();

  const {
    state: contextState,
    setIsLoading,
    isLoading,
    contextLoaded,
  } = useFileManagementContext();

  const [userStocks, setUserStocks] = useState<
    Array<{
      id: string | number | null;
      title: string;
      path: string;
      file: File | null;
      user_name: string;
      user_fullnames: string;
      created_at: string;
      user_id: string;
    }>
  >([]);

  useEffect(() => {

    setIsLoading(true);
    const userUserId = userId;
    const updatedStocksCollection = contextState.items.filter(
      (item) => item.user_id === userUserId
    );

    setUserStocks(updatedStocksCollection);
    setIsLoading(false);
    console.log(updatedStocksCollection);
  }, [contextState.items]); 

  if ( isLoading || !contextLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" color="current" />
      </div>
    );
  }

  return (
    <section>
      {/* <div className="flex justify-center">
        <Upload />
      </div> */}
      <div>
        <div className="mt-4 mb-0 flex flex-col justify-center items-center gap-6">
          <p className="self-start font-inter font-medium text-left text-sm sm:text-base">{userStocks.length} Fotox.</p>
          <DefaultGallery items={userStocks} />
        </div>
      </div>
    </section>
  );
};

export default OtherUserSpecificPublicGallery;
