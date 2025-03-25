import supabase from "@/lib/supabase.config";
import { useEffect, useState } from "react";

type MessagePayload = {
    new: {
      sender_id: string;
      receiver_id: string;
      [key: string]: any;
    };
}

const useRealtimeMessages = (senderId: string, receiverId: string) => {
  const [message, setMessage] = useState({});

  useEffect(() => {

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload: MessagePayload) => {
          if (
            (payload.new.sender_id === senderId && payload.new.receiver_id === receiverId) ||
            (payload.new.sender_id === receiverId && payload.new.receiver_id === senderId)
          ) {
            setMessage(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [senderId, receiverId]);

  return message;
};

export default useRealtimeMessages;
