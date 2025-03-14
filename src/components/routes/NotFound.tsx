import { useNavigate } from "react-router-dom";
import notFoundBg from "../../assets/images/not-found.png";
import { Button, Image } from "@heroui/react";
import DefaultLayout from "../layouts/DefaultLayout";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <DefaultLayout>
            <div className="w-full h-full flex flex-col gap-4 items-center justify-center py-20 z-0">
                <Image className="w-full h-full z-0" src={notFoundBg}/>
                <Button className="px-8 bg-white font-poppins text-black rounded-sm shadow-sm border border-solid border-black" onPress={() => navigate(-1)} >Back</Button>
            </div>
        </DefaultLayout>
    )
}

export default NotFound;
