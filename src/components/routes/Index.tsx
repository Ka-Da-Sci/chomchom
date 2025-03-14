import DefaultLayout from "@/components/layouts/DefaultLayout";
import useAssignAccessLevel from "@/hooks/useAssignAccessLevel";
import useFileManagementContext from "@/hooks/useFileManagementContext";
import { Spinner } from "@heroui/react";
import { lazy, Suspense } from "react";
// import DefaultGallery from "@/components/layouts/DefaultGallery";
const DefaultGallery = lazy(() => import("@/components/layouts/DefaultGallery"));


const PublicGallery = () => {
  useAssignAccessLevel('public');
  const { state: contextState } = useFileManagementContext();

  /* eslint-disable no-console */
  console.log(contextState.items);

  return(
    <DefaultLayout>
        <section>
            <div className="w-full max-w-full h-full flex flex-col gap-4 items-center py-8 sm:py-20">
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold font-montserrat antialiased">Public Fotox</h1>
                <Suspense fallback={<Spinner />}>
                    <DefaultGallery items={[...contextState.items]} />
                </Suspense>
            </div>                
        </section>
    </DefaultLayout>
)
};

export default PublicGallery;
