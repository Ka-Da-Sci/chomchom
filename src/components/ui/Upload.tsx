import FileUploadForm from "@/components/ui/FileUploadForm";
import { Button } from "@heroui/react";
import useFileManagementContext from "@/hooks/useFileManagementContext";

const Upload = () => {
    const {toggleForm, setToggleForm} = useFileManagementContext();

    return(
        <div className="flex flex-col gap-4 w-full">
            <Button className={`self-end w-full max-w-28 font-poppins font-semibold rounded-md text-primary-500 shadow-lg ${!toggleForm ? "bg-transparent border border-solid border-secondary-500" : "bg-[#338cf1] text-white"}`} onPress={() => (setToggleForm(!toggleForm))}>{toggleForm ? "Close Form" : "Add Fotox"}</Button>
            <div className="self-center w-full flex justify-center">
                {toggleForm ? <FileUploadForm /> : null}
            </div>
        </div>
    )
}

export default Upload;