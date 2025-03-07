import DefaultLayout from "@/components/layouts/DefaultLayout";
import PublicGallery from "./sections/PublicGallery";

const HomePage = () => {

    return(
        <DefaultLayout>
            <section>
                <div className="w-full max-w-full h-full flex flex-col gap-4 items-center py-8 sm:py-20">
                    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold font-montserrat antialiased">Public Gallery</h1>
                    <PublicGallery />
                </div>                
            </section>
        </DefaultLayout>
    )
};

export default HomePage;