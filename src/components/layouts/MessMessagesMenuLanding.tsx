import supabase from "@/lib/supabase.config";
import { MessagesTableColumnTypes } from "@/types/utilityTypes";
import {
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Form,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import UserCard from "../ui/UserCard";
import SupaBaseDataBase from "@/handlers/supadatabase";
import useRealtimeMessages from "@/hooks/useRealtimeMessages";
import React from "react";

/* eslint-disable no-console */
const MessagesMenuLanding = React.memo(() => {
  const [genMessages, setGenMessages] = useState<MessagesTableColumnTypes[]>([]);
  const [specMessages, setSpecMessages] = useState<MessagesTableColumnTypes[]>([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [newMessage, setNewMessage] = useState("");
  const { writeDoc, getMessages } = SupaBaseDataBase;
  const messageTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [currentUserId, setCurrentUserId] = useState<string>();
  const [receiverId, setReceiverId] = useState<string>();
  const [senderId, setSenderId] = useState<string>();
  const [selectedMessage, setSelectedMessage] = useState<MessagesTableColumnTypes | null>(null);

  const realtimeMessages = useRealtimeMessages(`${senderId}`, `${receiverId}`) as MessagesTableColumnTypes | null;

  // Fetch specific conversation messages
  useEffect(() => {
    if (!senderId || !receiverId || senderId.trim() === "" || receiverId.trim() === "") return;
    getMessages(senderId, receiverId).then((fetchedMessages) => {
      console.log("Fetched specMessages:", fetchedMessages);
      setSpecMessages(fetchedMessages as MessagesTableColumnTypes[]);
    });
  }, [senderId, receiverId, getMessages]);

  // Update specific messages in real-time
  useEffect(() => {
    if (realtimeMessages) {
      console.log("Realtime spec message update:", realtimeMessages);
      setSpecMessages((prev) => {
        const newMessages = [realtimeMessages, ...prev.filter((msg) => msg.id !== realtimeMessages?.id)];
        return newMessages.sort((a, b) => new Date(`${b.created_at}`).getTime() - new Date(`${a.created_at}`).getTime());
      });
    }
  }, [realtimeMessages]);

  // Fetch initial general messages
  const fetchMessages = useCallback(async () => {
    const user = await supabase.auth.getUser();
    if (!user?.data?.user) return;

    const userId = user.data.user.id;
    setCurrentUserId(userId);
    
    const { data, error } = await supabase.rpc("get_latest_messages", {
      user_id: userId,
    });
    
    if (error) {
      console.error("Error fetching latest messages:", error);
    } else {
      console.log("Fetched genMessages:", data);
      const sortedGenMessages = data.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setGenMessages(sortedGenMessages as MessagesTableColumnTypes[]);
    }
  }, []);

  // Initial fetch and real-time subscription
  useEffect(() => {
    fetchMessages();

    if (!currentUserId) return;

    const updateGenMessages = (newMessage: MessagesTableColumnTypes) => {
      setGenMessages((prev) => {
        // Create a unique key for each conversation
        const conversationKey = [newMessage.sender_id, newMessage.receiver_id].sort().join("-");
        const existingIndex = prev.findIndex((msg) => {
          const msgKey = [msg.sender_id, msg.receiver_id].sort().join("-");
          return msgKey === conversationKey;
        });

        let updatedMessages;
        if (existingIndex >= 0) {
          // Replace the existing message if the new one is more recent
          if (new Date(`${newMessage.created_at}`) > new Date(`${prev[existingIndex].created_at}`)) {
            updatedMessages = [...prev];
            updatedMessages[existingIndex] = newMessage;
          } else {
            updatedMessages = prev;
          }
        } else {
          // Add new conversation
          updatedMessages = [newMessage, ...prev];
        }

        return updatedMessages.sort((a, b) => new Date(`${b.created_at}`).getTime() - new Date(`${a.created_at}`).getTime());
      });
    };

    const channel = supabase
      .channel(`messages:${currentUserId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `sender_id=eq.${currentUserId}`,
        },
        (payload) => {
          console.log("INSERT sender payload:", payload);
          updateGenMessages(payload.new as MessagesTableColumnTypes);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `receiver_id=eq.${currentUserId}`,
        },
        (payload) => {
          console.log("INSERT receiver payload:", payload);
          updateGenMessages(payload.new as MessagesTableColumnTypes);
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, [currentUserId, fetchMessages]);

  const handleMessageTextChange = useCallback(() => {
    setNewMessage(messageTextAreaRef.current?.value || "");
  }, []);

  const handleSendMessage = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!newMessage.trim() || !senderId || !receiverId) return;

      const dispatchMessage = async () => {
        console.log("Sending message:", {
          senderId,
          receiverId,
          content: newMessage,
          tableName: "messages",
        });

        await writeDoc({
          senderId,
          receiverId,
          content: newMessage,
          tableName: "messages",
        });
      };

      dispatchMessage();
      setNewMessage("");
      messageTextAreaRef.current?.focus();
    },
    [newMessage, senderId, receiverId, writeDoc]
  );

  const handleMessageClick = useCallback(
    (msg: MessagesTableColumnTypes) => {
      const isMessagingSelf = msg.sender_id === msg.receiver_id && msg.sender_id === currentUserId;

      setReceiverId(
        isMessagingSelf
          ? `${currentUserId}`
          : msg.receiver_id === currentUserId
            ? `${msg.sender_id}`
            : `${msg.receiver_id}`
      );

      setSenderId(
        isMessagingSelf
          ? `${currentUserId}`
          : msg.receiver_id === currentUserId
            ? `${msg.receiver_id}`
            : `${msg.sender_id}`
      );
      setSelectedMessage(msg);
      onOpen();
    },
    [currentUserId, onOpen]
  );

  const memoizedMessages = useMemo(() => {
    return genMessages.map((msg) =>
      msg.receiver_user_data?.full_name && msg.receiver_user_data?.avatar_url ? (
        <div key={msg.id} className="w-full">
          <Card
            isPressable
            onPress={() => handleMessageClick(msg)}
            className="flex flex-row items-center gap-4 bg-none fill-none w-full shadow-none rounded-none outline-none border-none"
          >
            <img
              src={`${msg.receiver_id === msg.sender_id ? msg.receiver_user_data?.avatar_url : msg.receiver_id === currentUserId ? msg.sender_user_data?.avatar_url : msg.receiver_user_data?.avatar_url}`}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 flex flex-col items-start justify-between">
              <div className="flex items-center gap-4 w-full justify-between">
                <h3 className="font-semibold">
                  {`${msg.receiver_id === msg.sender_id ? msg.receiver_user_data?.full_name : msg.receiver_id === currentUserId ? msg.sender_user_data?.full_name : msg.receiver_user_data?.full_name}`}
                </h3>
                <i className="text-sm text-gray-500">
                  {new Date(`${msg.created_at}`).toLocaleDateString("en-GB").replace(/\//g, "-")}
                </i>
              </div>
              <p className="text-gray-600 text-sm truncate">{msg.content}</p>
            </div>
          </Card>
        </div>
      ) : null
    );
  }, [genMessages, handleMessageClick]);

  const memoizedDrawer = useMemo(() => {
    if (!selectedMessage) return null;

    return (
      <Drawer
        radius="none"
        className="rounded-md"
        isDismissable={false}
        isOpen={isOpen}
        size={"lg"}
        hideCloseButton={true}
        onClose={onClose}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex items-center gap-4">
                <div className="flex justify-center w-10 overflow-hidden">
                  <Button
                    className="w-min max-w-10 p-0 m-0 bg-transparent"
                    color="danger"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="fill-[rgb(239, 243, 244)]">
                      <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                    </svg>
                  </Button>
                </div>
                <div className="max-w-40 overflow-hidden">
                  <UserCard
                    userFullnames={`${selectedMessage.receiver_id === selectedMessage.sender_id ? selectedMessage.receiver_user_data?.full_name : selectedMessage.receiver_id === currentUserId ? selectedMessage.sender_user_data?.full_name : selectedMessage.receiver_user_data?.full_name}`}
                    srcTxt={`${selectedMessage.receiver_id === selectedMessage.sender_id ? selectedMessage.receiver_user_data?.avatar_url : selectedMessage.receiver_id === currentUserId ? selectedMessage.sender_user_data?.avatar_url : selectedMessage.receiver_user_data?.avatar_url}`}
                  />
                </div>
              </DrawerHeader>
              <DrawerBody>
                <div className="h-full overflow-y-auto overflow-hidden p-2 bg-white shadow flex flex-col-reverse gap-2">
                  {specMessages.map((specMsg) => (
                    <p
                      key={`${specMsg.id || crypto.randomUUID()}`}
                      className={`px-3 py-1 my-1 max-w-full hyphens-auto break-words rounded text-wrap ${
                        specMsg.sender_id === senderId
                          ? "bg-blue-400 text-white self-end rounded-tr-2xl"
                          : "bg-gray-300 text-black self-start rounded-tl-2xl"
                      }`}
                    >
                      {specMsg.content}
                    </p>
                  ))}
                </div>
              </DrawerBody>
              <DrawerFooter className="items-end">
                <Form
                  onSubmit={handleSendMessage}
                  className="w-full flex items-end flex-row justify-between"
                >
                  <Textarea
                    type="text"
                    className="w-full p-2 border rounded mt-2"
                    value={newMessage}
                    ref={messageTextAreaRef}
                    onChange={handleMessageTextChange}
                    placeholder="Type a message..."
                  />
                  <Button
                    type="submit"
                    className="mt-2 p-2 bg-default-500 text-white rounded"
                  >
                    Send
                  </Button>
                </Form>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    );
  }, [
    selectedMessage,
    isOpen,
    onClose,
    specMessages,
    senderId,
    newMessage,
    handleSendMessage,
    handleMessageTextChange,
  ]);

  if (!genMessages.length) {
    return null; // or your loading/no messages component
  }

  return (
    <div className="w-full max-w-full mx-0 p-4 pt-0">
      <div className="mt-0 flex flex-col gap-4">{memoizedMessages}</div>
      {memoizedDrawer}
    </div>
  );
});

export default MessagesMenuLanding;
