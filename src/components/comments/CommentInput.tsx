import { useState } from "react";
import addComment from "./addComment";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Button, Form, Input } from "@heroui/react";


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
      <Form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <Input
          type="text"
          className=" w-full"
          placeholder={!parentId ? "Enter your comment" : "Enter your reply"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" className="bg-blue-500 rounded-md text-white px-4 py-2 w-max">{!parentId ? "Comment" : "Reply"}</Button>
      </Form>
    );
  };
  

  export default CommentInput;
