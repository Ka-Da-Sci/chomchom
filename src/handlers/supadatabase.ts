import supabase from "@/lib/supabase.config";
import { CommentsTableColumnTypes } from "@/types/utilityTypes";


type WriteDocInputs = Partial<CommentsTableColumnTypes> & {
  title?: string | null;
  path?: string | null;
  file?: File | null;
  user_name?: string;
  user_fullnames?: string;
  tableName?: string;
};

/* eslint-disable no-console */
const SupaBaseDataBase = {
  readDocs: (...args: string[]) => {
    const [collection_name] = args;
    let docs: Array<Record<string, any>> = [];
    const valid_collection_name =
      `${collection_name ? collection_name : "safe_stocks"}` as "stocks";
    return new Promise(async (resolve) => {
      try {
        const { data } = await supabase.from(valid_collection_name).select().order("created_at", {ascending: false});
        data?.map((doc) => docs.push(doc));
        resolve(docs);
      } catch (error) {
        console.error("Error reading documents:", error);
      }
    });
  },

  writeDoc: (...args: [WriteDocInputs]) => {
    const [inputs] = args;
    const targetTable: "comments" | "stocks" = inputs.tableName ? inputs.tableName as "comments" | "stocks" : "stocks";
      
    return new Promise(async (resolve) => {
      try {
        let updatedInputData;
        // const randomId = Math.floor(Math.random() * 1000000000);
        switch(targetTable){
          case "stocks":
            updatedInputData = {
              title: inputs.title,
              path: inputs.path ?? undefined,
              created_at: new Date().toISOString(),
              user_fullnames: inputs.user_fullnames,
              user_name: inputs.user_name
            };
            break;
          
          case "comments":
            updatedInputData = {
              post_id: inputs.post_id,
              parent_id: inputs.parent_id,
              user_id: inputs.user_id,
              content: inputs.content,
            };
            break;
          default:
            throw new Error("Invalid table name or table input data");
        };

        const { data } = await supabase
          .from(targetTable)
          .insert({ ...updatedInputData })
          .select();
        resolve(`New doc successfully inserted: ${data}`);
      } catch (error) {
        console.error("Error writing document:", error);
      }
    });
  },

  fetchComments: async (postId: number) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: false });
  
    if (error) console.error(error);
    return data as CommentsTableColumnTypes[];
  }
};

export default SupaBaseDataBase;
