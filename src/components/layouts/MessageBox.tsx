// import React from "react";
import {
  Drawer,
  DrawerContent,
  Button,
  useDisclosure,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Textarea,
} from "@heroui/react";

import MessageIcon from "../ui/MessageIcon";
import { useState, useEffect, useRef } from "react";
import useRealtimeMessages from "@/hooks/useRealtimeMessages";
import SupaBaseDataBase from "@/handlers/supadatabase";

const MessagesBox = ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { writeDoc, getMessages } = SupaBaseDataBase;
  const messageTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const realtimeMessages = useRealtimeMessages(senderId, receiverId);

  useEffect(() => {
    if (!senderId || !receiverId || senderId.trim() === "" || receiverId.trim() === "") return;
    getMessages(senderId, receiverId).then(setMessages);
  }, [senderId, receiverId]);

  useEffect(() => {
    setMessages((prev) => [...prev, ...realtimeMessages]);
  }, [realtimeMessages]);

  const handleMessageTextChange = () => {
    const setTextInputs = () => {
        setNewMessage(messageTextAreaRef.current?.value || "");
    };

    setTextInputs();
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    await writeDoc({senderId, receiverId, content: newMessage, tableName: "messages"});
    // if (messageTextAreaRef.current) {
    //   messageTextAreaRef.current.value = "";
    // }
    setNewMessage("");
  };
  //   const [size, setSize] = React.useState("md");

  //   const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];

  //   const handleOpen = () => {
  //     // setSize(size);
  //     onOpen();
  //   };

  //   const Chat = () => {
  //     return (
  //       <div className="p-4 bg-gray-100 rounded-lg w-full max-w-md">

  //       </div>
  //     );
  //   };

  return (
    <>
      <div className="flex gap-3 h-10 w-10 overflow-hidden justify-center">
        <Button
          className="p-0 m-0 rounded-none h-auto w-auto max-w-full max-h-full bg-transparent"
          onPress={onOpen}
        >
          <MessageIcon />
        </Button>
      </div>
      <Drawer
        radius="none"
        className="rounded-md"
        isDismissable={false}
        isOpen={isOpen}
        size={"xl"}
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
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="fill-[rgb(239, 243, 244)]"
                    >
                      <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                    </svg>
                  </Button>
                </div>
                <p className="font-bold font-poppins text-default-700 text-base">
                  Messages
                </p>
              </DrawerHeader>
              <DrawerBody>
                <div className="h-full overflow-y-auto p-2 bg-white shadow flex flex-col gap-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 my-1 w-max rounded ${msg.sender_id === senderId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}
                    >
                      {msg.content}
                    </div>
                  ))}
                </div>
              </DrawerBody>
              <DrawerFooter className="items-end">
                <Textarea
                  type="text"
                  className="w-full p-2 border rounded mt-2"
                  value={newMessage}
                  ref={messageTextAreaRef}
                  onChange={handleMessageTextChange}
                  placeholder="Type a message..."
                />
                <Button
                  onPress={handleSendMessage}
                  className="mt-2 p-2 bg-default-500 text-white rounded"
                >
                  Send
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MessagesBox;
