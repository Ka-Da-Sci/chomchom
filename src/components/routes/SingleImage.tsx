import { Card, CardBody, Image, CardFooter, Button } from "@heroui/react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { miscContext } from "@/context/FileManagementContext";
import DefaultLayout from "../layouts/DefaultLayout";

const SingleImage = () => {
    const navigate = useNavigate();
  const context = useContext(miscContext);
  const { state } = useLocation();
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }
  const { state: contextState } = context;

  const itemInView = contextState.items.find((item) => item.id === state.id);

  /* eslint-disable no-console */
  console.log(itemInView);

  return (
    <DefaultLayout>
      <div className="container m-auto mt-10  h-full flex flex-col justify-center items-center gap-10 relative">
        <Button onPress={() => navigate(-1)} className="self-start px-8 bg-white text-blue-500 rounded-lg shadow-sm border border-solid border-blue-500" >Back</Button>
        <Card shadow="sm" className="w-full h-max max-w-[300px] sm:max-w-[400px] max-h-[400px] sm:max-h-[500px]">
          <CardBody className="w-full h-max max-w-full p-4 max-h-full items-center justify-normal">
            <Image
              alt={
                itemInView && itemInView?.title ? itemInView?.title : "image"
              }
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
