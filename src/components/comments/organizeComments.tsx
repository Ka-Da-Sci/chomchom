import { CommentsTableColumnTypes } from "@/types/utilityTypes";

/* eslint-disable no-console */

const organizeComments = (comments: CommentsTableColumnTypes[]): CommentsTableColumnTypes[] => {
  const postMap = new Map<string, CommentsTableColumnTypes>();
  const result: CommentsTableColumnTypes[] = [];

  // Initialize the map with all posts and ensure `replies` array exists
  for (const comment of comments) {
    if (!comment?.replies || comment?.replies.length === 0){
      console.log(comment);
      comment.replies = [];
    }
    postMap.set(comment.id, comment);
  }

  // Iterate through posts and organize them into the nested structure
  for (const comment of comments) {
    if (comment.parent_id) {
      const parent = postMap.get(comment.parent_id);
      if (parent) {
        parent.replies!.push(comment);
      }
    } else {
      result.push(comment); // Only top-level posts remain in the result array
    }
  }

  // debugger;
  return result;
}

export default organizeComments;
