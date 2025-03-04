import { useContext } from "react";
import { miscContext } from "@/context/FileManagementContext";
import DefaultGallery from "@/components/layouts/DefaultGallery";
import DefaultLayout from "../layouts/DefaultLayout";
import { useAuthContext } from "@/hooks/useAuthContext";


/* eslint-disable no-console */
const PrivateGallery = () => {
    const { session } = useAuthContext();
  const context = useContext(miscContext);
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }
  const { state: contextState } = context;
  const myStocks = contextState.items.filter(item => {
    const { user } = session;
    const userUserName = user?.email?.split('@')[0].toLowerCase();
    return item.user_name === userUserName;
  })

  console.log(myStocks);

  return (
    <DefaultLayout >
        <div className="mt-20 mb-10 flex flex-col justify-center items-center gap-6">
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold font-montserrat antialiased">Personal Gallery</h1>
            <DefaultGallery items={[...myStocks]} />
        </div>
    </DefaultLayout>
  );
};

export default PrivateGallery;
