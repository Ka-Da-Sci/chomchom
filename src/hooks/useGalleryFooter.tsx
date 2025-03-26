import { Button, CardFooter } from "@heroui/react";
import useFileManagementContext from "./useFileManagementContext";
import supabase from "@/lib/supabase.config";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { StockItemsColumnTypes } from "@/types/utilityTypes";
import UserCard from "@/components/ui/UserCard";

export const useGalleryFooter = () => {
  const { access } = useFileManagementContext();
  const deleteButtonUseRef = useRef<HTMLButtonElement | null>(null);

  /* eslint-disable no-console*/
  const handleOnClickDeleteButton = async (itemPath?: string) => {
    try {
      const itemId = deleteButtonUseRef?.current?.id;

      if (!itemId) {
        console.error("Item ID is undefined or null.");
        return;
      }

      console.log("Deleting item with ID:", itemId, "Type:", typeof itemId);

      const { error } = await supabase
        .from("stocks")
        .delete()
        .eq("id", Number(itemId)); // Ensure itemId is a number

      if (error) {
        throw new Error(`Failed to delete item: ${error.message}`);
      }

      // console.log("Item path:", itemPath?.split('public/chommie-bucket/')[1]);

      const { error: deleteError } = await supabase.storage
        .from("chommie-bucket")
        .remove([`${itemPath?.split("public/chommie-bucket/")[1]}`]);
      if (deleteError) {
        throw new Error(`{Failed to delete file:  ${itemPath}}`);
      }

      console.log("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const galleryFooter = {
    private: ({ item }: { item: StockItemsColumnTypes }) => {
      return (
        <CardFooter className="flex flex-col gap-3 items-start w-full overflow-visible cursor-auto">
          <p className="font-inter font-semibold text-left antialiased">
            {item.title}
          </p>
          <div className="flex justify-between gap-1 items-center w-full">
            <div className="flex flex-col gap-1">
              {/* <span className="font-semibold text-default-400 text-small text-left">
                Date Posted
              </span> */}
              <i className="text-default-400 text-small text-left">
                {item.created_at?.split("T")[0]}
              </i>
            </div>
            <Button
              onPress={() => handleOnClickDeleteButton(`${item.path}`)}
              ref={deleteButtonUseRef}
              id={`${item.id}`}
              className="rounded-md bg-transparent border border-solid border-danger-500 font-poppins font-medium antialiased text-default-400"
            >
              Delete
            </Button>
          </div>
        </CardFooter>
      );
    },
    public: ({ item }: { item: StockItemsColumnTypes }) => {
      return (
        <CardFooter className="flex flex-col gap-6 items-start w-full overflow-visible cursor-auto">
          <p className="font-inter font-semibold text-left antialiased">
            {item.title}
          </p>
          <div className="flex justify-between gap-4 items-center w-full">
            <Link
              to={`/profile/user/${item.user_id}`}
              className="max-w-40"
            >
              {/* <Image src={`${item?.user_data?.avatar_url}`} className="rounded-full max-w-10" />
              <p className="font-semibold text-default-700 text-small hover:underline text-left text-ellipsis whitespace-nowrap overflow-hidden">
                {item.user_fullnames}
              </p> */}

              <UserCard srcTxt={`${item?.user_data?.avatar_url}`} userFullnames={`${item.user_fullnames}`} />
            </Link>
            <div className="flex flex-col gap-1">
              {/* <span className="font-semibold text-default-400 text-small text-left">
                Date Posted
              </span> */}
              <i className="text-default-900 text-small whitespace-nowrap text-left">
                {item.created_at?.split("T")[0]}
              </i>
            </div>
          </div>
        </CardFooter>
      );
    },
  };

  let CompatibleFooter;

  switch (access) {
    case "private":
      CompatibleFooter = galleryFooter["private"];
      break;
    default:
      CompatibleFooter = galleryFooter["public"];
  }

  return { CompatibleFooter };
};

export default useGalleryFooter;
