import supabase from "@/lib/supabase.config";

type WriteDocInputs = {
  title: string | null;
  path: string | null;
  file: File | null;
  user_name: string,
  user_fullnames: string,
};

/* eslint-disable no-console */
const SupaBaseDataBase = {
  readDocs: (...args: string[]) => {
    const [collection_name] = args;
    let docs: Array<Record<string, any>> = [];
    const valid_collection_name =
      `${collection_name ? collection_name : "stocks"}` as "stocks";
    return new Promise(async (resolve) => {
      try {
        const { data } = await supabase.from(valid_collection_name).select();
        data?.map((doc) => docs.push(doc));
        resolve(docs);
      } catch (error) {
        console.error("Error reading documents:", error);
      }
    });
  },

  writeDoc: (...args: [WriteDocInputs]) => {
    const [inputs] = args;
      
    return new Promise(async (resolve) => {
      try {
        // const randomId = Math.floor(Math.random() * 1000000000);
        const updatedInputData = {
          title: inputs.title,
          path: inputs.path,
          created_at: new Date().toISOString(),
          user_fullnames: inputs.user_fullnames,
          user_name: inputs.user_name
        };

        const { data } = await supabase
          .from("stocks")
          .insert({ ...updatedInputData })
          .select();
        resolve(`New doc successfully inserted: ${data}`);
      } catch (error) {
        console.error("Error writing document:", error);
      }
    });
  },
};

export default SupaBaseDataBase;
