import { Input } from "@heroui/input";
import SearchIcon from "../ui/SearchIcon";
import { useEffect, useRef } from "react";
import useFileManagementContext from "@/hooks/useFileManagementContext";

// /* eslint-disable no-console */
const Search = () => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        searchItems("");
    }, [])

    const { searchItems } = useFileManagementContext();


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
