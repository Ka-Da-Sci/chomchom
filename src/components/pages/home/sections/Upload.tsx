import FileUploadForm from "@/components/ui/FileUploadForm";
import { Button } from "@heroui/react";
import { useState } from "react";

interface UploadProps {
    onChangeProp: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmitProp: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Upload: React.FC<UploadProps> = ({ onChangeProp, onSubmitProp }) => {
    const [toggleForm, setToggleForm] = useState(false);
    return(
        <div className="flex flex-col gap-4 w-full">
            <Button className={`self-end w-full max-w-28 font-poppins font-semibold rounded-lg text-[#ffffff] ${!toggleForm ? "bg-[#6b7280]" : "shadow-lg bg-[#338cf1]"}`} onPress={() => (setToggleForm(!toggleForm))}>{toggleForm ? "Close Form" : "Add Photo"}</Button>
            <div className="self-center w-full flex justify-center">
                {toggleForm ? <FileUploadForm onChangeProp={onChangeProp} onSubmitProp={onSubmitProp} /> : null}
            </div>
        </div>
    )
}

export default Upload;