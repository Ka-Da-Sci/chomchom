import DefaultLayout from "@/components/layouts/DefaultLayout";
import Gallery from "./sections/Gallery";
import Upload from "./sections/Upload";

const HomePage = () => {
    return(
        <DefaultLayout>
            <section className="flex justify-center">
                <Upload />
            </section>
            <section>
                <div className="w-full max-w-full h-full flex flex-col gap-4 items-center py-8 sm:py-20">
                    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold font-montserrat antialiased">Gallery</h1>
                    <Gallery />
                </div>                
            </section>
        </DefaultLayout>
    )
};

export default HomePage;