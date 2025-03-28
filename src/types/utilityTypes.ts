import { Database } from "@/types/database.types";


type CommentReplyTypes = {
  replies?: CommentsTableColumnTypes[];
  revealReplies?: boolean;
  user_data?: {
    avatar_url?: string;
    [key: string]: any;
  };
};

export type CommentsTableColumnTypes = Database["public"]["Views"]["advanced_comments_data"]["Row"] & CommentReplyTypes;


type MessageAuxTypes = {
  receiver_user_data?: {
    avatar_url?: string;
    full_name?: string;
    [key: string]: any;
  };
  sender_user_data?: {
    avatar_url?: string;
    full_name?: string;
    [key: string]: any;
  };
};
export type MessagesTableColumnTypes = Database["public"]["Tables"]["messages"]["Row"] & MessageAuxTypes;

type StockItemsColumnTypesExtra = Database["public"]["Views"]["safe_stocks"]["Row"];
export type StockItemsColumnTypes = {
  file?: File | null;
  user_id?: string;
  created_at?: string;
  user_data?: {
    avatar_url?: string;
    [key: string]: any;
  };
} & Partial<StockItemsColumnTypesExtra>;