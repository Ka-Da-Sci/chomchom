import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/* eslint-disable */

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const realtimeDatabaseSubscription = (
    databaseTableName: string,
    callback: (payload: any) => void
  ) => {
    try {
      const databaseTable = supabase
        .channel("custom-all-channel")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: databaseTableName },
          (payload) => {
            console.log("Change received!", payload);
            callback(payload); // Pass the payload to the callback function
          }
        )
        .subscribe();
  
      return { databaseTable }; // Return the subscription for potential unsubscribing
    } catch (error) {
      console.error("Error subscribing to real-time updates:", error);
    }
  };
  

export default supabase;
