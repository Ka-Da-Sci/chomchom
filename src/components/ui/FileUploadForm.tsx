import { useState } from "react";
import { Form, Input, Button } from "@heroui/react";

const FileUploadForm = () => {
  const [action, setAction] = useState<string | null>(null);

  return (
    <Form
      className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[450px] flex justify-center flex-col gap-4"
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >   
        <h3 className="text-center font-inter font-light text-base sm:text-2xl md:text-3xl antialiased self-center">Upload Stock Image</h3>

      <Input
        className="font-montserrat font-semibold"
        isRequired
        errorMessage="Please enter a valid title for your file(s)."
        name="title"
        placeholder="Title"
        type="text"
      />

      <Input
        className="upload-file-input font-montserrat font-semibold text-[#685757]"
        isRequired
        errorMessage="Please select valid file(s) for upload."
        name="upload-file"
        placeholder="No file chosen"
        type="file"
        multiple
      />
      <div className="flex justify-between max-sm:flex-wrap w-full gap-2">
        <Button className="self-center w-full" color="primary" type="submit">
          Save Changes
        </Button>
        <Button className="self-center w-full" type="reset" variant="flat">
          Reset Changes
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
};

export default FileUploadForm;
