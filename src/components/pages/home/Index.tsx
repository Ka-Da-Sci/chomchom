import { useState } from "react";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Gallery from "./sections/Gallery";
import Upload from "./sections/Upload";
import guitar from "../../../assets/images/1728656699454.jpg";
import loml from "../../../assets/images/loml.jpg";

const photosGal = [
    {
      title: "Raspberry",
      path: loml,
      file: null,
    },
    {
      title: "Lemon",
      path: 'https://picsum.photos/id/1005/200/200',
      file: null,
    },
    {
      title: "Avocado",
      path: guitar,
      file: null,
    },
    {
      title: "Lemon 2",
      path: 'https://picsum.photos/id/1003/200/200',
      file: null,
    },
    {
      title: "Banana",
      path: 'https://picsum.photos/id/1002/200/200',
      file: null,
    },
    {
      title: "Watermelon",
      path: 'https://picsum.photos/id/1001/200/200',
      file: null,
    },
  ];


const HomePage = () => {
    // const [action, setAction] = useState<string | null>(null);
    const [input, setInput] = useState<{ title: string | null; file: File | null; path: string | null }>({title: null, file: null, path:null});
    const [photoItems, setPhotoItems] = useState<{ title: string; path: string; file: File | null }[]>(photosGal);
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput({title: event.target.value, file: event.target.files ? event.target.files[0] : null, path: event.target.files ? URL.createObjectURL(event.target.files[0]) : null});
    };
    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        /* eslint-disable no-console */        
        if (input.title && input.file && input.path) {
            setPhotoItems([...photoItems, { title: input.title, file: input.file, path: input.path }]);
            console.log(photoItems);

            // Clear the form inputs
            const form = event.target as HTMLFormElement;
            form.reset();
        }
    };

    return(
        <DefaultLayout>
            <section className="flex justify-center">
                <Upload onChangeProp={handleOnChange} onSubmitProp={handleOnSubmit} />
            </section>
            <section>
                <div className="w-full max-w-full h-full flex flex-col gap-4 items-center py-8 sm:py-20">
                    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold font-montserrat antialiased">Gallery</h1>
                    <Gallery fileLog={photoItems} />
                </div>                
            </section>
        </DefaultLayout>
    )
};

export default HomePage;