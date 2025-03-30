import { useEffect, useReducer, useRef, useState } from "react";
import { Form, Input, Button, Alert } from "@heroui/react";
import { Image } from "@heroui/react";
import SupaBaseDataBase from "@/handlers/supadatabase";
import useUppyWithSupabase from "@/hooks/useUppyWithSupabase";
const { writeDoc } = SupaBaseDataBase;
import { useAuthContext } from "@/hooks/useAuthContext";
import supabase from "@/lib/supabase.config";
import useFileManagementContext from "@/hooks/useFileManagementContext";

const initialstate = {
  formAction: null,
  filePath: null,
};

type State = {
  formAction: string | null;
  filePath: string | null;
};

interface Action {
  type: string;
  payload: string | null;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setFormAction":
      return { ...state, formAction: action.payload };
    case "setFilePath":
      return { ...state, filePath: action.payload };
    default:
      return state;
  }
};

/* eslint-disable no-console */
/** Function to check if a file path exists and generate a new unique path */
const generateUniquePath = async (
  folderPath: string,
  filePath: string,
  bucketName: string
): Promise<string> => {
  console.log("Entered");
  const min = 10n ** 9n; // 1 billion
  const max = 10n ** 15n; // 1 quadrillion
  let newPath = `${filePath}-${(min + BigInt(Math.floor(Math.random() * Number(max - min)))).toLocaleString().replace(/,/g, "-")}`;
  
  while (true) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error("Error checking file existence:", error.message);
      return filePath; // Fallback to original path
    }

    if (!data?.some((file) => file.name === newPath)) break; // File doesn't exist, use it

    // Append a counter to create a new unique filename
    newPath = `${filePath}-${(min + BigInt(Math.floor(Math.random() * Number(max - min)))).toLocaleString().replace(/,/g, "-")}`;
  }

  console.log("Returning path:", newPath);
  return `${folderPath}/${newPath}`;
};

const FileUploadForm = () => {
  const bucketName = "chommie-bucket";
  const [isUploading, setIsUploading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialstate);
  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uppy = useUppyWithSupabase(bucketName);
  const { session } = useAuthContext();
  const [reUpload, setReUpload] = useState(false);
  const [validate, setValidate] = useState(false);
  const { state: contextState, dispatch: contextDispatch } =
    useFileManagementContext();


const ReUploadAlert = () => {
  const title = "Failed to upload!";
  const description = "Refresh the page and retry.";

  return (
    <div className="flex items-center justify-center w-full">
      <Alert description={description} title={title} />
    </div>
  );
}


  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    contextDispatch({
      type: "setInput",
      payload: {
        title: titleRef.current ? titleRef.current.value : null,
        file:
          fileRef.current && fileRef.current.files
            ? fileRef.current.files[0]
            : null,
        path:
          fileRef.current && fileRef.current.files && fileRef.current.files[0]
            ? URL.createObjectURL(fileRef.current.files[0])
            : null,
      },
    });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    const form = event.target as HTMLFormElement;
    const { user } = (await supabase.auth.getUser()).data;
    const user_full_name = user?.user_metadata.full_name || "Unknown User";
    const user_name = user?.email!.split("@")[0] || "unknown";
    const folderPath = session.user.id;
    setValidate(true);
    console.log(user_full_name, user_name);

    if (
      contextState.input.title &&
      contextState.input.file &&
      contextState.input.path
    ) {
      uppy.cancelAll();

      if (user_name === "unknown" || user_full_name === "Unknown User"){
        uppy.cancelAll()
        form.reset();
        setIsUploading(false);
        setReUpload(true);
      }

      let fileName = `${await generateUniquePath(folderPath, contextState.input.title.replace(/ /g, "").slice(0, 10).toLowerCase(), bucketName)}`;

      if (!fileName || typeof fileName !== "string") {
        console.log("Failef To Make The Post...");
        return;
      }

      uppy.addFile({
        name: fileName,
        data: contextState.input.file,
        type: contextState.input.file.type,
        // user_full_name,
        // user_name,
      });

      try {
        const result = await uppy.upload().catch((error) => {
          console.error("Upload error:", error);
          throw error;
        });

        if (result?.successful?.length === 0) {
          throw new Error("Upload failed");
        }

        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);

        const publicUrl = data.publicUrl;
        // const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${contextState.input.title}`;

        await writeDoc({
          ...contextState.input,
          path: publicUrl,
          user_fullnames: user_full_name,
          user_name: user_name,
        });
      } catch (error) {
        console.error("Upload failed:", error);
      }

      setIsUploading(false);
      // Clear the form inputs
      form.reset();
    }
  };

  const newUploadFilePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files
      ? URL.createObjectURL(event.target.files[0])
      : null;
    dispatch({ type: "setFilePath", payload: file });
  };

  useEffect(() => {
    if (state.formAction) {
      const timer = setTimeout(() => {
        dispatch({ type: "setFilePath", payload: null });
        dispatch({ type: "setFormAction", payload: null });
      });

      return () => clearTimeout(timer);
    }
  }, [state.formAction]);

  const Preview = ({ filePath }: { filePath: string }) => {
    return (
      <div className="max-w-[200px] aspect-square">
        <div className="w-full aspect-square overflow-y-auto overflow-x-hidden rounded-sm">
          <Image
            className="object-cover w-max h-max max-sm:max-w-full max-w-[200px]"
            radius="sm"
            shadow="sm"
            src={filePath}
            alt="preview"
          />

        </div>
        <p className="w-full text-center font-montserrat font-normal text-sm text-[#000000] antialiased capitalize">
          Preview
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-center font-inter font-light text-base sm:text-2xl md:text-3xl antialiased self-center">
        Upload Stock Image
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-4 w-full">
        {state.filePath && <Preview filePath={state.filePath} />}
        <Form
          className="w-auto max-w-[300px] md:max-w-[400px] lg:max-w-[450px] flex justify-center flex-col gap-4"
          validationBehavior="native"
          onReset={() => dispatch({ type: "setFormAction", payload: "Done" })}
          onSubmit={handleOnSubmit}
        >
          <Input
            className="font-montserrat font-semibold"
            isRequired
            name="title"
            placeholder="Title"
            type="text"
            ref={titleRef}
            max={250}
            min={3}
            disabled={!session}
            validate={(value) => {
              if (value.length < 3 && validate) {
                setValidate(true);
                return "File name/title must be atleast 3 characters long.";
              }

              if (value.length > 250){
                return "Text must not exceed 250 characters";
              }

              return value === "admin" ? "Nice try!" : null;
            }}
            onChange={handleOnChange}
          />

          <Input
            className="upload-file-input font-montserrat font-semibold text-[#685757]"
            isRequired
            name="upload-file"
            placeholder="No file chosen"
            errorMessage={
              !session
                ? "You must be logged in!"
                : "Please select valid file(s) for upload."
            }
            type="file"
            ref={fileRef}
            accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
            disabled={!session}
            onChange={(event) => {
              handleOnChange(event);

              newUploadFilePath(event);
            }}
          />
          {!session && (
            <div className="text-center text-red-500 text-sm">
              You must be logged in!
            </div>
          )}
          <div className="flex justify-between max-sm:flex-wrap w-full gap-2">
            <div className="relative w-full">
              <Button
                isLoading={isUploading}
                className="self-center w-full bg-default-600 disabled:bg-default-500"
                color="primary"
                type="submit"
                disabled={!session}
              >
                Save And Upload
              </Button>
            </div>
            <Button
              onPress={(e) => {
                setValidate(false);
                const formButton = e.target as HTMLFormElement;
                const form = formButton?.closest("form");
                uppy.cancelAll();
                form?.closest("form")?.reset();
                setIsUploading(false);
              }}
              className="self-center w-full"
              type="reset"
              variant="flat"
              disabled={!session}
            >
              Reset Changes
            </Button>
          </div>
          {reUpload && <ReUploadAlert />}
        </Form>
      </div>
    </div>
  );
};

export default FileUploadForm;
