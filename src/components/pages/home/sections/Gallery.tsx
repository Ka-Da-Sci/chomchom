import { Card, CardBody, Image, CardFooter } from "@heroui/react";
import { useContext } from "react";
import { miscContext } from "@/context/FileManagementContext";

const Gallery = () => {
  const context = useContext(miscContext);
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }
  const { state } = context;

  /* eslint-disable no-console */
  console.log(state.items);

  return (
    <div className="w-full place-items-center gap-10 grid [@media(max-width:450px)]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {state.items.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          className="w-full h-full"
          >
          <CardBody className="overflow-hidden w-full h-full max-w-full max-h-full p-4 flex items-center justify-normal">
            <Image
              alt={item && item.title ? item.title : "image"}
              className="object-cover object-right-top w-full h-full max-h-[400px]"
              radius="sm"
              shadow="sm"
              src={item.path}
            />
          </CardBody>
          <CardFooter className="flex flex-col gap-3 items-start w-full pb-6 overflow-visible">
            <p className="font-inter font-semibold text-left antialiased">{item.title}</p>
            <div className="flex justify-between flex-wrap gap-4 items-center w-full">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-default-400 text-small text-left">{item.user_fullnames}</span>
                <span className="text-default-400 text-small text-left">@{item.user_name}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-default-400 text-small text-left">Date Posted</span>
                <span className="text-default-400 text-small text-left">{item.created_at.split('T')[0]}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Gallery;
