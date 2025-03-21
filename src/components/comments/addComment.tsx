// import supabase from "@/lib/supabase.config";
import SupaBaseDataBase from "@/handlers/supadatabase";

// /* eslint-disable no-console */
const addComment = async (
  postId: number,
  parentId: string | null,
  userId: string,
  content: string
) => {

  // const dataE = {
  //   post_id: postId,
  //   parent_id: parentId,
  //   user_id: userId,
  //   content: content,
  //   tableName: "comments",
  // };

  // console.log(dataE);
  // debugger

  const { writeDoc } = SupaBaseDataBase;
  await writeDoc({
    post_id: postId,
    parent_id: parentId,
    user_id: userId,
    content: content,
    tableName: "comments",
  });
  // const { data, error } = await supabase.from("comments").insert([
  //   {
  //     post_id: postId,
  //     parent_id: parentId,
  //     user_id: userId,
  //     content: content,
  //   },
  // ]);

//   if (error) throw new Error(error.message);
//   return data;
};

export default addComment;
