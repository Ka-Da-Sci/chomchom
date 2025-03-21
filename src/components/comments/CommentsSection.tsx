import { useEffect, useState } from "react";
import { CommentsTableColumnTypes } from "@/types/utilityTypes";
import SupaBaseDataBase from "@/handlers/supadatabase";
import organizeComments from "./organizeComments";
import CommentComponent from "./CommentComponent";
import supabase from "@/lib/supabase.config";


const CommentsSection: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<CommentsTableColumnTypes[]>([]);
  const { fetchComments } = SupaBaseDataBase;

  useEffect(() => {
    const loadComments = async () => {
      const rawComments = await fetchComments(postId);
      setComments(organizeComments(rawComments));
    };
    loadComments();
  }, [postId]);

  /* eslint-disable no-console */
  useEffect(() => {
    const subscription = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
        setComments((prev) => {
          console.log(prev);
          
            if (payload.new.parent_id === null) {
            return organizeComments([payload.new as CommentsTableColumnTypes, ...prev]);
            } else {
            const addReply = (comments: CommentsTableColumnTypes[]): CommentsTableColumnTypes[] => {
              return comments.map(comment => {
              if (comment.id === payload.new.parent_id) {
                return {
                  replies: [...(comment.replies || []), { ...payload.new as CommentsTableColumnTypes, replies: [] } ],
                ...comment,
                revealReplies: true,
                };
              } else if (comment.replies) {
                return {
                  replies: addReply(comment.replies),
                ...comment,
                };
              }
              return comment;
              });
            };
            return organizeComments(addReply(prev));
            }
        });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="w-full">
      {comments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsSection;
