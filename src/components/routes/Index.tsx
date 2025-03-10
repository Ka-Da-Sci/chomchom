import { useContext } from "react";
import { miscContext } from "@/context/FileManagementContext";
import DefaultGallery from "@/components/layouts/DefaultGallery";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import useAssignAccessLevel from "@/hooks/useAssignAccessLevel";


const PublicGallery = () => {
  useAssignAccessLevel('public');
  const context = useContext(miscContext);
  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }
  const { state: contextState } = context;

  /* eslint-disable no-console */
  console.log(contextState.items);

  return(
    <DefaultLayout>
        <section>
            <div className="w-full max-w-full h-full flex flex-col gap-4 items-center py-8 sm:py-20">
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold font-montserrat antialiased">Public Gallery</h1>
                <DefaultGallery items={[...contextState.items]} />
            </div>                
        </section>
    </DefaultLayout>
)
};

export default PublicGallery;
