import { CommentsTableColumnTypes } from "@/types/utilityTypes";
import CommentInput from "./CommentInput";
import { Card, CardBody } from "@heroui/react";
import { useEffect, useState } from "react";

/* eslint-disable no-console */
const CommentComponent: React.FC<{ comment: CommentsTableColumnTypes; }> = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [pressable, setPressable] = useState(false);

  useEffect(() => {
    const togglePressable = () => {
      if (comment.replies?.length !== 0){
        setPressable(true);
      }
    }

    togglePressable();

    return () => void 0;
  }, [comment.replies]);
  
  useEffect(() => {
    const setHideReplies = () => {
      if (comment.revealReplies){
        setShowReplies(true);
      }
    };

    setHideReplies();

    return () => void 0;
  }, [comment.revealReplies, comment]);

    return (
      <Card className="border-l-2 pl-4 my-2 w-full">
        <p className="font-bold">{comment.user_fullname}</p>
        <Card className="w-full flex items-start border-none shadow-none rounded-none" isPressable={pressable} onPress={() => {
          setShowReplies(!showReplies)
        }}>
          {comment.content}
        </Card>
        <CommentInput postId={Number(comment.post_id)} parentId={comment.id} />
        {comment.replies?.map((reply) => (
          showReplies && <Card key={reply.id}>
            <CommentComponent key={reply.id} comment={reply} />
          </Card>
          
        ))}

      </Card>
    );
  };

  export default CommentComponent;
  