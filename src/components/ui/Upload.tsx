import FileUploadForm from "@/components/ui/FileUploadForm";
import { Button } from "@heroui/react";
import { useContext } from "react";
import { miscContext } from "@/context/FileManagementContext";

const Upload = () => {
    const context = useContext(miscContext);
    if(!context){
        throw new Error("miscContext must be used within a Provider")
    }
    const {toggleForm, setToggleForm} = context;

    return(
        <div className="flex flex-col gap-4 w-full">
            <Button className={`self-end w-full max-w-28 font-poppins font-semibold rounded-md text-primary-500 shadow-lg ${!toggleForm ? "bg-transparent border border-solid border-secondary-500" : "bg-[#338cf1] text-white"}`} onPress={() => (setToggleForm(!toggleForm))}>{toggleForm ? "Close Form" : "Add Photo"}</Button>
            <div className="self-center w-full flex justify-center">
                {toggleForm ? <FileUploadForm /> : null}
            </div>
        </div>
    )
}

export default Upload;