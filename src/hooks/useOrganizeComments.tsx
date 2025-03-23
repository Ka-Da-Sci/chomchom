import { CommentsTableColumnTypes } from "@/types/utilityTypes";
import useCommentsContext from "@/hooks/useCommentsContext";
import { useEffect, useState } from "react";
import SupaBaseDataBase from "@/handlers/supadatabase";
import supabase from "@/lib/supabase.config";
// /* eslint-disable no-console */

const useOrganizeComments = () => {
  const [newPayload, setNewPayload] = useState<CommentsTableColumnTypes>();
  const { commentsContextState, dispatch } = useCommentsContext();
  const [commentsState, setCommentsState] = useState<
    CommentsTableColumnTypes[]
  >(commentsContextState.comments || []);
  const [postComments, setpostComments] = useState<CommentsTableColumnTypes[]>(
    []
  );

  const { fetchComments } = SupaBaseDataBase;

  useEffect(() => {
    const loadComments = async () => {
      const rawComments =
        commentsContextState.postId !== undefined &&
        (await fetchComments(commentsContextState.postId));
      rawComments && setCommentsState(rawComments);
    };
    loadComments();
  }, [commentsContextState.postId]);

  /* eslint-disable no-console */
  useEffect(() => {
    const subscription = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          // debugger;
          const newComment: CommentsTableColumnTypes = {
            content: payload.new.content,
            created_at: payload.new.created_at,
            id: payload.new.id,
            parent_id: payload.new.parent_id,
            post_id: payload.new.post_id,
            user_fullname: payload.new.user_fullname,
            user_id: payload.new.user_id,
            replies: payload.new.replies || []
          };
          setNewPayload(newComment);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [setCommentsState]);

  useEffect(() => {
    console.log(newPayload);
    if (newPayload?.parent_id === null) {
      setCommentsState((prev) => [
        newPayload as CommentsTableColumnTypes,
        ...(prev || []),
      ]);
    } else {
      const addReply = (
        comments: CommentsTableColumnTypes[]
      ): CommentsTableColumnTypes[] => {
        return comments.map((comment) => {
          if (comment.id === newPayload?.parent_id) {
            const { replies: oldReplies, ...updatedCommentObj } = comment;
            return {
              ...updatedCommentObj,
              replies: [
                {
                  ...(newPayload as CommentsTableColumnTypes),
                  replies: [],
                },
                ...(oldReplies || []),
              ],
              revealReplies: true,
            };
          } else if (comment.replies) {
            return {
              ...comment,
              replies: addReply(comment.replies),
            };
          }
          return comment;
        });
      };
      setCommentsState((prev) => {
        const updatedComments = addReply(prev || []);

        // debugger;
        return [...updatedComments];
      });
    }
  }, [newPayload]);

  useEffect(() => {
    console.log(newPayload);
    // Create a deep copy of commentsState to avoid mutation
    const clonedComments = commentsState.map((comment) => ({
      ...comment,
      replies: comment.replies ?? [] as CommentsTableColumnTypes[],
    }));

    // debugger;
    const postMap = new Map<string, (typeof clonedComments)[0]>();
    const result: typeof clonedComments = [];

    // Initialize the map with all posts
    for (const comment of clonedComments) {
      postMap.set(comment.id, comment);
    }

    // Organize into a nested structure
    for (const comment of clonedComments) {
      if (comment.parent_id) {
        const parent = postMap.get(comment.parent_id);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        result.push(comment);
      }
    }

    console.log(result);
    setpostComments(result);
  }, [commentsState]);

  useEffect(() => {
    dispatch({ type: "setComments", payLoad: postComments });
  }, [postComments]);
};

export default useOrganizeComments;
