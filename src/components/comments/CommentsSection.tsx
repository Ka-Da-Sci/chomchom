
import useCommentsContext from "@/hooks/useCommentsContext";
import CommentComponent from "./CommentComponent";
import useOrganizeComments from "@/hooks/useOrganizeComments";


// /* eslint-disable no-console */
const CommentsSection = () => {
  const { commentsContextState } = useCommentsContext();
  const { comments: postComments } = commentsContextState;
  useOrganizeComments();

  return (
    <div className="w-full flex flex-col gap-2">
      {/* <CommentInput /> */}
      {postComments && postComments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsSection;
