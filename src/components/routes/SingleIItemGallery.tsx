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

// /* eslint-disable no-console */
const SingleItemGallery = () => {
  const navigate = useNavigate();
  const { id: itemInViewId } = useParams();

  const {
    state: contextState,
    isLoading,
    setIsLoading,
    contextLoaded,
    setContextLoaded,
  } = useFileManagementContext();

  const [itemInView, setItemInView] = useState<{
    id: string | number | null;
    title: string;
    path: string;
    file: File | null;
    user_name: string;
    user_fullnames: string;
    created_at: string;
  } | null>({
    id: 0,
    title: "",
    path: "",
    file: null,
    user_name: "",
    user_fullnames: "",
    created_at: "",
  });

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
      // console.log(Object.keys(contextState.items[0]).length);
      // console.log(itemReferenced);
      // console.log(contextState.items);
      setContextLoaded(true);
      setIsLoading(false);
    } else if (
      itemReferenced === null &&
      contextState.items.length === 0 &&
      contextLoaded
    ) {
      // console.log(itemReferenced);
      // console.log(contextState.items);
      // console.log(contextLoaded);
      // debugger;
      setContextLoaded(true);
      setIsLoading(false);
    }
  }, [contextState.items, itemInViewId, contextLoaded]);

  // Show loading state while waiting for data (Using HeroUI Spinner)
  if (isLoading || !contextLoaded) {
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
      <div className=" w-full mt-10 mb-20 z-0 flex flex-col justify-center items-center gap-10 relative">
        <Button
          onPress={() => navigate(-1)}
          className="self-start px-8 bg-white text-blue-500 rounded-lg shadow-sm border border-solid border-blue-500"
        >
          Back
        </Button>
        <div className="w-full flex flex-col md:flex-row gap-8 h-max max-h-full md:max-h-[500px] overflow-hidden">
          <Card
            shadow="sm"
            className="w-full m-4 h-max max-w-[300px] md:max-w-[400px] max-h-full md:max-h-full"
          >
            <CardBody className="w-full h-max max-w-full p-4 max-h-[400px] md:max-h-[350px] items-center justify-normal ">
              <Image
                alt={itemInView?.title ?? "image"}
                className="object-cover object-right-top w-full h-full max-h-full overflow-y-auto"
                src={itemInView?.path}
              />
            </CardBody>
            <CardFooter className="flex flex-col gap-3 items-start w-full pb-6 overflow-visible cursor-auto">
              <p className="font-inter font-semibold text-left antialiased">
                {itemInView?.title}
              </p>
              <div className="flex justify-between flex-wrap gap-4 items-center w-full">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-default-400 text-small text-left">
                    {itemInView?.user_fullnames}
                  </span>
                  <i className="text-default-400 text-small text-left">
                    @{itemInView?.user_name}
                  </i>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-default-400 text-small text-left">
                    Date Posted
                  </span>
                  <i className="text-default-400 text-small text-left">
                    {itemInView?.created_at.split("T")[0]}
                  </i>
                </div>
              </div>
            </CardFooter>
          </Card>
          <div className="p-0 w-full flex flex-col max-h-full overflow-auto m-0">
            <CommentInput postId={Number(itemInView.id)} />
            <CommentsSection postId={Number(itemInView.id)} />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SingleItemGallery;
