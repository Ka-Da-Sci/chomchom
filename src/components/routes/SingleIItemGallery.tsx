import {
  Card,
  CardBody,
  Image,
  CardFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import NotFound from "./NotFound";
import useFileManagementContext from "@/hooks/useFileManagementContext";
import CommentInput from "../comments/CommentInput";
import CommentsSection from "../comments/CommentsSection";
import useCommentsContext from "@/hooks/useCommentsContext";
import useGalleryFooter from "@/hooks/useGalleryFooter";
import { StockItemsColumnTypes } from "@/types/utilityTypes";
// import useOrganizeComments from "@/hooks/useOrganizeComments";

// /* eslint-disable no-console */
const SingleItemGallery = () => {
  const navigate = useNavigate();
  const { id: itemInViewId } = useParams();
  const { dispatch } = useCommentsContext();
  const { CompatibleFooter } = useGalleryFooter();

  const {
    state: contextState,
    isLoading,
    setIsLoading,
    contextLoaded,
    setContextLoaded,
  } = useFileManagementContext();

  const [itemInView, setItemInView] = useState<StockItemsColumnTypes | null>({
    id: 0,
    title: "",
    path: "",
    file: null,
    user_name: "",
    user_fullnames: "",
    created_at: "",
    user_id: "",
    user_data: {},
  });

  useEffect(() => {
    itemInViewId !== undefined &&
      dispatch({ type: "setPostId", payLoad: Number(itemInView?.id) });
    dispatch({ type: "setComments", payLoad: [] });
  }, [itemInView?.id]);

  useEffect(() => {
    if (contextState.items.length !== 0) {
      setContextLoaded(false);
    }
    const itemReferenced = itemInViewId
      ? contextState.items.find(
          (item) => item.id === parseInt(itemInViewId as string)
        ) || null
      : null;

    setItemInView(itemReferenced);
    if (itemReferenced !== null && itemInView !== null) {
      setContextLoaded(true);
      setIsLoading(false);
    } else if (
      itemReferenced === null &&
      contextState.items.length !== 0 &&
      Object.keys(contextState.items[0]).length !== 1
    ) {
      setContextLoaded(true);
      setIsLoading(false);
    } else if (
      itemReferenced === null &&
      contextState.items.length === 0 &&
      contextLoaded
    ) {
      // debugger;
      setContextLoaded(true);
      setIsLoading(false);
    }
  }, [contextState.items, itemInViewId, contextLoaded]);

  // Show loading state while waiting for data (Using HeroUI Spinner)
  if (isLoading || !contextLoaded || itemInView?.path?.trim() === "") {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" color="current" />
        </div>
      </DefaultLayout>
    );
  }

  //   // Show loading state while waiting for data (Using Tailwind CSS Default Spin Animation)
  // if (isLoading || !contextLoaded) {
  //   return (
  //     <DefaultLayout>
  //       <div className="flex justify-center items-center h-screen">
  //         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  //       </div>
  //     </DefaultLayout>
  //   );
  // }

  // If the item isn't found *after* context is loaded, show NotFound
  if (itemInView === null) {
    return <NotFound />;
  }

  return (
    <DefaultLayout>
      <div className=" w-full mt-4 mb-20 z-0 flex flex-col justify-center items-center gap-10 relative">
        <Button
          onPress={() => navigate(-1)}
          className="self-start px-8 bg-white text-blue-500 rounded-lg shadow-sm border border-solid border-default-500"
        >
          Back
        </Button>
        <div className="w-full p-[1px] sm:p-0 flex flex-col md:flex-row gap-8 h-max max-h-full md:max-h-[645px] overflow-hidden">
          <Card
            shadow="sm"
            className="w-full md:mb-[2px] md:mt-1 md:ml-1 h-max max-w-[400px] max-h-full md:max-h-full"
          >
            <CardBody className="w-full h-max max-w-full p-1 max-h-[400px] md:max-h-[342px] items-center justify-normal ">
              <Image
                alt={itemInView?.title ?? "image"}
                className="object-cover sm:object-right-top w-full h-full max-h-full overflow-y-auto"
                src={`${itemInView?.path}`}
              />
            </CardBody>
            <CardFooter className="flex flex-col gap-3 items-start w-full pb-1 overflow-visible cursor-auto p-0">
              {/* <p className="font-inter font-semibold text-left antialiased">
                {itemInView?.title}
              </p> */}
              <CompatibleFooter item={{ ...itemInView, user_data: itemInView?.user_data ?? {} }} />
            </CardFooter>
          </Card>
          <div className="p-2 md:pr-0 w-full max-h-full overflow-hidden m-0 rounded-md bg-default-600 shadow-xl">
            <div className="sm:pr-2 w-full flex flex-col gap-8 max-h-full overflow-auto m-0 rounded-md">
              <CommentInput />
              <CommentsSection />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SingleItemGallery;
