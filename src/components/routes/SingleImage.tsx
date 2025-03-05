import { Card, CardBody, Image, CardFooter, Button, Spinner } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { miscContext } from "@/context/FileManagementContext";
import DefaultLayout from "../layouts/DefaultLayout";
import NotFound from "./NotFound";

// /* eslint-disable no-console */
const SingleImage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemInViewId = searchParams.get("image-id");

  const context = useContext(miscContext);
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }

  const { state: contextState } = context;

  const [itemInView, setItemInView] = useState<{
    id: string | number | null;
    title: string;
    path: string;
    file: File | null;
    user_name: string;
    user_fullnames: string;
    created_at: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [contextLoaded, setContextLoaded] = useState(false); // Check if context is populated

  // Check if context has items (to prevent premature NotFound rendering)
  useEffect(() => {
    if (contextState.items.length > 0) {
      setContextLoaded(true);
    }
  }, [contextState.items]);

  useEffect(() => {
    setIsLoading(true); // Start loading

    if (contextLoaded) {
      const itemReferenced = itemInViewId
        ? contextState.items.find(
            (item) => item.id === parseInt(itemInViewId as string)
          ) || null
        : null;

      setItemInView(itemReferenced);
      setIsLoading(false); // End loading
    }
  }, [contextState.items, itemInViewId, contextLoaded]);

  // Show loading state while waiting for data
  if (isLoading || !contextLoaded) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" color="primary" />
        </div>
      </DefaultLayout>
    );
  }
  

  // If the item isn't found *after* context is loaded, show NotFound
  if (itemInView === null) {
    return <NotFound />;
  }

  return (
    <DefaultLayout>
      <div className="container m-auto mt-10 h-full flex flex-col justify-center items-center gap-10 relative">
        <Button
          onPress={() => navigate(-1)}
          className="self-start px-8 bg-white text-blue-500 rounded-lg shadow-sm border border-solid border-blue-500"
        >
          Back
        </Button>
        <Card
          shadow="sm"
          className="w-full h-max max-w-[300px] sm:max-w-[400px] max-h-[400px] sm:max-h-[500px]"
        >
          <CardBody className="w-full h-max max-w-full p-4 max-h-full items-center justify-normal">
            <Image
              alt={itemInView?.title ?? "image"}
              className="object-cover object-right-top w-full h-full max-h-full"
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
      </div>
    </DefaultLayout>
  );
};

export default SingleImage;
