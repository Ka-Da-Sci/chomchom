import { useEffect, useReducer, useContext, useRef } from "react";
import { miscContext } from "@/context/FileManagementContext";
import { Form, Input, Button } from "@heroui/react";
import { Image } from "@heroui/react";
import SupaBaseDataBase from "@/handlers/supadatabase";
import useUppyWithSupabase from "@/hooks/useUppyWithSupabase";
const { writeDoc } = SupaBaseDataBase;
import { useAuthContext } from "@/hooks/useAuthContext";

const initialstate = {
  formAction: null,
  filePath: null,
};

interface State {
  formAction: string | null;
  filePath: string | null;
}

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

const FileUploadForm = () => {
  const bucketName ="chommie-bucket";
  const [state, dispatch] = useReducer(reducer, initialstate);
  const context = useContext(miscContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uppy = useUppyWithSupabase(bucketName);
  const { session } = useAuthContext();

  if (!context) {
    throw new Error("miscContext must be used within a Provider");
  }
  const { state: contextState, dispatch: contextDispatch } = context;

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

  /* eslint-disable no-console */
  // const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   if (
  //     contextState.input.title &&
  //     contextState.input.file &&
  //     contextState.input.path
  //   ) {
  //     uppy.cancelAll();
  //     uppy.addFile({
  //       name: contextState.input.title,
  //       data: contextState.input.file,
  //       type: contextState.input.file.type,
  //     });
  //     try {
  //       uppy.upload()
  //       .then(result => {result?.successful ? Promise.resolve(result) : Promise.reject(result?.failed)
  //         // The path to the file is available in data.path
  //         const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}//${contextState.input.title}`;
  //         return publicUrl;
  //     })
  //     .then((publicUrl) => {
  //       writeDoc({...contextState.input, path: publicUrl}).then(console.log);
  //       return publicUrl;
  //     })
  //     .then(publicUrl => contextDispatch({
  //       type: "setItems",
  //       payload: {
  //         title: contextState.input.title,
  //         file: contextState.input.file,
  //         path: publicUrl,
  //       },})
  //     )
  //     } catch (error) {
  //       Promise.resolve({ failed: [error] })
  //     }

  //     // Clear the form inputs
  //     const form = event.target as HTMLFormElement;
  //     form.reset();
  //   }
  // };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (contextState.input.title && contextState.input.file && contextState.input.path) {
      uppy.cancelAll();
      
      uppy.addFile({
        name: contextState.input.title,
        data: contextState.input.file,
        type: contextState.input.file.type,
      });
  
      try {
        const result = await uppy.upload();
  
        if (result?.successful?.length === 0) {
          throw new Error("Upload failed");
        }
  
        const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${contextState.input.title}`;
  
        await writeDoc({ ...contextState.input, path: publicUrl });
        
        contextDispatch({
          type: "setItems",
          payload: {
            title: contextState.input.title,
            file: contextState.input.file,
            path: publicUrl,
          },
        });
  
      } catch (error) {
        console.error("Upload failed:", error);
      }
  
      // Clear the form inputs
      const form = event.target as HTMLFormElement;
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
      <div className="max-w-[200px]">
        <Image
          className="object-cover w-max h-max max-sm:max-w-full max-w-[200px] aspect-square"
          radius="sm"
          shadow="sm"
          src={filePath}
          alt="preview"
        />
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
            disabled={!session}
            validate={(value) => {
              if (value.length < 3) {
                return "File name/title must be atleast 3 characters long.";
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
            errorMessage={!session ? "You must be logged in!" : "Please select valid file(s) for upload."}
            type="file"
            ref={fileRef}
            accept="image/*"
            disabled= {!session}
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
              className="self-center w-full disabled:bg-default-500"
              color="primary"
              type="submit"
              disabled={!session}
              >
              Save Changes
              </Button>
            </div>
            <Button className="self-center w-full" type="reset" variant="flat" disabled={!session}>
              Reset Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FileUploadForm;
