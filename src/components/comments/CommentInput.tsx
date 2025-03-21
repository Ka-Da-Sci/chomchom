import { useState } from "react";
import addComment from "./addComment";
import { useAuthContext } from "@/hooks/useAuthContext";


const CommentInput: React.FC<{ postId: number; parentId?: string }> = ({ postId, parentId }) => {
    const [content, setContent] = useState("");
    const { session } =useAuthContext();
    // debugger
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!content.trim()) return;
      await addComment(postId, parentId || null, session?.user?.id, content);
      setContent("");
    };
  
    return (
      <form onSubmit={handleSubmit} className="my-2 w-full">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Post</button>
      </form>
    );
  };
  

  export default CommentInput;
