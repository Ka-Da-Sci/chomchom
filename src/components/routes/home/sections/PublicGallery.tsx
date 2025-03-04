import { useContext } from "react";
import { miscContext } from "@/context/FileManagementContext";
import DefaultGallery from "@/components/layouts/DefaultGallery";


const PublicGallery = () => {
  const context = useContext(miscContext);
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }
  const { state: contextState } = context;

  /* eslint-disable no-console */
  console.log(contextState.items);

  return (
    <DefaultGallery items={[...contextState.items]} />
  );
};

export default PublicGallery;
