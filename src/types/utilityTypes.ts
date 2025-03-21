import { Database } from "@/types/database.types";


type CommentReplyTypes = {
  replies?: CommentsTableColumnTypes[];
  revealReplies?: boolean;
};
export type CommentsTableColumnTypes = Database["public"]["Tables"]["comments"]["Row"] & CommentReplyTypes;