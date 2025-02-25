// src/components/UppyUploader.tsx
import { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
// import supabase from "@/lib/supabase.config";

/* eslint-disable no-console */
const useUppyWithSupabase = (bucketName: string) => {
  const [uppy] = useState(() => new Uppy());
  const projectUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // useEffect(() => {
  //     const fetchBuckets = async () => {
  //         const { data, error: fetchError } = await supabase.storage.listBuckets();

  //         if (fetchError) {
  //             console.error("❌ Error fetching buckets:", fetchError.message);
  //         } else {
  //             console.log("✅ Available Buckets:", data);
  //         }
  //     };

  //     fetchBuckets();
  // }, []);

  // const createBucket = async () => {
  //     const { data, error } = await supabase.storage.createBucket("chomchom-test-3", {
  //         public: true, // Make it publicly accessible
  //     });

  //     if (error) {
  //         console.error("❌ Error creating bucket:", error.message);
  //     } else {
  //         console.log("✅ Bucket created successfully:", data);
  //     }
  // };
  // createBucket();

  useEffect(() => {
    uppy.use(Tus, {
      endpoint: `${projectUrl}/storage/v1/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      chunkSize: 6 * 1024 * 1024,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    });

    // Adding bucketName as a metadata field
    uppy.on("file-added", (file) => {
      file.meta = {
        ...file.meta,
        bucketName,
        objectName: file.name,
        contentType: file.type,
      };
    });

    uppy.on("upload-success", (file, response) => {
      console.log("✅ Upload successful!", file, response);
    });

    uppy.on("upload-error", (file, error) => {
      console.error("❌ Upload error:", file, error);
    });

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
