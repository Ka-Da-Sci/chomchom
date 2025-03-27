import { CommentsTableColumnTypes } from "@/types/utilityTypes";
import CommentInput from "./CommentInput";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";
import UserCard from "../ui/UserCard";
import { Link } from "react-router-dom";

// /* eslint-disable no-console */
const CommentComponent: React.FC<{ comment: CommentsTableColumnTypes }> = ({
  comment,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [pressable, setPressable] = useState(false);

  useEffect(() => {
    const togglePressable = () => {
      if (comment.replies?.length !== 0) {
        setPressable(true);
      }
    };

    togglePressable();

    return () => void 0;
  }, [comment.replies]);

  useEffect(() => {
    const setHideReplies = () => {
      if (comment.revealReplies) {
        setShowReplies(true);
      }
    };

    setHideReplies();

    return () => void 0;
  }, [comment.revealReplies, comment]);

  return (
    <Card className="border-2 px-4 py-2 w-full shadow-none ">
      <Link to={`/profile/user/${comment.user_id}`}>
        <UserCard
          srcTxt={`${comment.user_data.avatar_url}`}
          userFullnames={`${comment.user_fullname}`}
        />
      </Link>
      <Card
        className="w-full mt-3 mb-1 flex items-start border-none shadow-none rounded-none"
        isPressable={pressable}
        onPress={() => {
          setShowReplies(!showReplies);
        }}
      >
        {comment.content}
      </Card>
      <CommentInput parentId={`${comment.id}`} />
      <div
        className={`${comment.replies?.length === 0 ? "hidden" : "flex flex-col gap-6 mt-4"}`}
      >
        {comment.replies?.map(
          (reply) =>
            showReplies && <CommentComponent key={reply.id} comment={reply} />
        )}
      </div>
    </Card>
  );
};

export default CommentComponent;
