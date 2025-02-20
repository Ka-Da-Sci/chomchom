import { Card, CardBody, Image } from "@heroui/react";
import { useContext } from "react";
import { miscContext } from "@/config/context";

const Gallery = () => {
  
  const context = useContext(miscContext);
  if (!context) {
      throw new Error("miscContext must be used within a Provider");
  }
  const { state } = context;

  return (
    <div className="w-full place-items-center gap-10 grid [@media(max-width:450px)]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {state.photoItems.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          className="w-full h-full max-w-[300px] aspect-square bg-gray-500 "
        >
          <CardBody className="overflow-hidden w-full h-full max-w-full max-h-full p-0 flex items-center justify-center">
            <Image
              alt={item.title}
              className="object-cover w-max h-max max-h-full max-w-full"
              radius="sm"
              shadow="sm"
              src={item.path}
            />
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Gallery;
