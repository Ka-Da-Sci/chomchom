import { Card, CardBody, Image, CardFooter, Button, Spinner} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { miscContext } from "@/context/FileManagementContext";
import { useContext, useEffect } from "react";

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
  const context = useContext(miscContext);
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }

  const { isLoading, setIsLoading, contextLoaded } = context;

  useEffect(() => {
    setIsLoading(true);

    if (contextLoaded){
        setIsLoading(false);
    }
  }, [contextLoaded])

  // Show loading state while waiting for data (Using HeroUI Spinner)
  if (isLoading || !contextLoaded) {
    return (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" color="current" />
        </div>
    );
  }
  /* eslint-disable no-console */
  console.log(items);

  return (
    <div className="w-full place-items-center gap-10 grid [@media(max-width:450px)]:grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <Card
          key={index}
          shadow="sm"
          className="w-full h-full"
          >
          <Card as={Button} onPress={() => {
            navigate(`/image/${item.id}`)
          }} isPressable className="overflow-hidden w-full h-full max-w-full max-h-full p-4 rounded-none flex items-center justify-normal">
            <CardBody className="overflow-hidden p-0 w-full h-full max-w-full max-h-full items-center justify-normal">
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
