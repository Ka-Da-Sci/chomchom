import { Button, CardFooter } from "@heroui/react";
import useFileManagementContext from "./useFileManagementContext";
// import '../styles/globals.css';

type Item = {
  title?: string;
  user_fullnames?: string;
  user_name?: string;
  created_at?: string;
};

export const useGalleryFooter = () => {
  const { access } = useFileManagementContext();

  const galleryFooter = {
    private: ({ item }: { item: Item }) => {
      return (
        <CardFooter className="flex flex-col gap-3 items-start w-full pb-6 overflow-visible cursor-auto">
          <p className="font-inter font-semibold text-left antialiased">
            {item.title}
          </p>
          <div className="flex justify-between gap-1 items-center w-full">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-default-400 text-small text-left">
                Date Posted
              </span>
              <i className="text-default-400 text-small text-left">
                {item.created_at?.split("T")[0]}
              </i>
            </div>
            <Button className="rounded-md bg-transparent border border-solid border-danger-500 font-poppins font-medium antialiased text-default-400" >Delete</Button>
          </div>
        </CardFooter>
      );
    },
    public: ({ item }: { item: Item }) => {
      return (
        <CardFooter className="flex flex-col gap-3 items-start w-full pb-6 overflow-visible cursor-auto">
          <p className="font-inter font-semibold text-left antialiased">
            {item.title}
          </p>
          <div className="flex justify-between flex-wrap gap-4 items-center w-full">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-default-400 text-small text-left">
                {item.user_fullnames}
              </span>
              <i className="text-default-400 text-small text-left">
                @{item.user_name}
              </i>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-default-400 text-small text-left">
                Date Posted
              </span>
              <i className="text-default-400 text-small text-left">
                {item.created_at?.split("T")[0]}
              </i>
            </div>
          </div>
        </CardFooter>
      );
    },
  };

  let CompatibleFooter;

  switch(access){
    case "private":
      CompatibleFooter = galleryFooter['private'];
      break;
    default:
      CompatibleFooter = galleryFooter['public'];
  }



  return { CompatibleFooter };
};

export default useGalleryFooter;
