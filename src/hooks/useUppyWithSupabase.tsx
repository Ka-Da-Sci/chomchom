import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import supabase from "@/lib/supabase.config";

/* eslint-disable no-console */
const useUppyWithSupabase = (bucketName: string) => {
  const [uppy] = useState(() => new Uppy());
  const projectUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    const initializeUppy = async () => {
      // Retrieve the current user's session for authentication
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const tusPlugin = uppy.getPlugin("Tus");
      if (tusPlugin) {
        uppy.removePlugin(tusPlugin);
      }
      uppy
        .use(Tus, {
          endpoint: `${projectUrl}/storage/v1/upload/resumable`, // Supabase TUS endpoint
          retryDelays: [0, 3000, 5000, 10000, 20000], // Retry delays for resumable uploads
          headers: {
            authorization: `Bearer ${session?.access_token}`, // User session access token
            apikey: supabaseKey, // API key for Supabase
          },
          uploadDataDuringCreation: true, // Send metadata with file chunks
          removeFingerprintOnSuccess: true, // Remove fingerprint after successful upload
          chunkSize: 6 * 1024 * 1024, // Chunk size for TUS uploads (6MB)
          allowedMetaFields: [
            "bucketName",
            "objectName",
            "contentType",
            "cacheControl",
          ], // Metadata fields allowed for the upload
          onError: (error) => console.error("Upload error:", error), // Error handling for uploads
        })
        .on("file-added", (file) => {
          // Attach metadata to each file, including bucket name and content type
          file.meta = {
            ...file.meta,
            bucketName, // Bucket specified by the user of the hook
            objectName: file.name, // Use file name as object name
            contentType: file.type, // Set content type based on file MIME type
          };
        })
        .on("upload-success", (file, response) => {
          console.log("✅ Upload successful!", file, response);
        })
        .on("upload-error", (file, error) => {
          console.error("❌ Upload error:", file, error);
        });
    };

    // Initialize Uppy with Supabase settings
    initializeUppy();

    return () => {
      uppy.cancelAll(); // Stop any ongoing uploads
      const tusPlugin = uppy.getPlugin("Tus");
      if (tusPlugin) {
        uppy.removePlugin(tusPlugin);
      }
    };
  }, [uppy, bucketName]);

  return uppy;
};

export default useUppyWithSupabase;
