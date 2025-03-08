import { Input } from "@heroui/input";
import SearchIcon from "./SearchIcon";
import { useContext, useEffect, useRef } from "react";
import { miscContext } from "@/context/FileManagementContext";

// /* eslint-disable no-console */
const Search = () => {
    const searchInputRef = useRef<HTMLInputElement>(null);
    const context = useContext(miscContext);

    useEffect(() => {
        searchItems("");
    }, [])

    if (!context){
        throw new Error("miscontext must be used within a provider.")
    }
    const { searchItems } = context;


    const handleOnChange = () => {
        const enteredSearchText = searchInputRef?.current?.value;
        searchItems(enteredSearchText);
    }

  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[10rem] [@media(max-width:350px)]:hidden",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 rounded-md",
      }}
      ref={searchInputRef}
      onChange={handleOnChange}
      placeholder="Search..."
      size="sm"
      startContent={<SearchIcon width={18} height={18} size={18} />}
      type="search"
    />
  );
};

export default Search;
