import { Card, CardBody, Image, CardFooter, Button} from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface Item {
  id: string | number | null;
  title: string;
  path: string;
  user_fullnames: string;
  user_name: string;
  created_at: string;
}

const DefaultGallery = ({ items }: { items: Item[] }) => {

    const navigate = useNavigate();
  /* eslint-disable no-console */
  console.log(items);

  return (
    <div className="w-full place-items-center gap-10 grid [@media(max-width:450px)]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item, index) => (
        <Card
          key={index}
          shadow="sm"
          className="w-full h-full"
          >
          <Card as={Button} onPress={() => {
            navigate(`/image?image-id=${item.id}`)
          }} isPressable className="overflow-hidden w-full h-full max-w-full max-h-full p-4 rounded-none flex items-center justify-normal">
            <CardBody className="overflow-hidden w-full h-full max-w-full max-h-full items-center justify-normal">
              <Image
                alt={item && item.title ? item.title : "image"}
                className="object-cover object-right-top w-full h-full max-h-[400px]"
                src={item.path}
              />
            </CardBody>
          </Card>
          <CardFooter className="flex flex-col gap-3 items-start w-full pb-6 overflow-visible cursor-auto">
            <p className="font-inter font-semibold text-left antialiased">{item.title}</p>
            <div className="flex justify-between flex-wrap gap-4 items-center w-full">
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-default-400 text-small text-left">{item.user_fullnames}</span>
                <i className="text-default-400 text-small text-left">@{item.user_name}</i>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-default-400 text-small text-left">Date Posted</span>
                <i className="text-default-400 text-small text-left">{item.created_at.split('T')[0]}</i>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DefaultGallery;
