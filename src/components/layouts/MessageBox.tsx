import {
  Drawer,
  DrawerContent,
  Button,
  useDisclosure,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Textarea,
  Form,
} from "@heroui/react";

import MessageIcon from "../ui/MessageIcon";
import { useState, useEffect, useRef } from "react";
import useRealtimeMessages from "@/hooks/useRealtimeMessages";
import SupaBaseDataBase from "@/handlers/supadatabase";
import UserCard from "../ui/UserCard";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import useFileManagementContext from "@/hooks/useFileManagementContext";

const MessagesBox = ({
  senderId,
  receiverId,
  receiver_names,
  receiver_avatar_url,
}: {
  senderId: string;
  receiverId: string;
  receiver_avatar_url: string;
  receiver_names: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { writeDoc, getMessages } = SupaBaseDataBase;
  const messageTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { contextLoaded } = useFileManagementContext();
  const pathname = useLocation().pathname;

  const { session } = useAuthContext();

  const realtimeMessages = useRealtimeMessages(senderId, receiverId);

  // useEffect(() => {
  //   onOpen(); // Open the drawer when the component mounts
  // }, []);

  useEffect(() => {
    if (
      !senderId ||
      !receiverId ||
      senderId.trim() === "" ||
      receiverId.trim() === ""
    )
      return;
    getMessages(senderId, receiverId).then(setMessages);
  }, [senderId, receiverId]);

  useEffect(() => {
    setMessages((prev) => [realtimeMessages, ...prev]);
  }, [realtimeMessages]);

  const handleMessageTextChange = () => {
    const setTextInputs = () => {
      setNewMessage(messageTextAreaRef.current?.value || "");
    };

    setTextInputs();
};

const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    messageTextAreaRef.current?.focus();
    event.preventDefault();
    messageTextAreaRef.current?.focus();
    if (!newMessage.trim()) return;
    
    const dispatchMessage = async() => {
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
  };

  return (
    <>
      <div className="flex gap-3 h-10 w-10 overflow-hidden justify-center">
        <Button
          className="p-0 m-0 rounded-none h-auto w-auto max-w-full max-h-full bg-transparent"
          onPress={() => {
            if (!session && contextLoaded && pathname === `/profile/user/${receiverId}`) {
              navigate("/login");
              return null;
            };

            onOpen();
          }}
        >
          <MessageIcon />
        </Button>
      </div>
      <Drawer
        classNames={{
          body: "p-1 pb-0 m-0",
          header: "p-1 m-0",
          footer: "p-1 pt-0 m-0",
        }}
        radius="none"
        className="rounded-md w-full"
        // isDismissable={false}
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
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="fill-[rgb(239, 243, 244)]"
                    >
                      <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                    </svg>
                  </Button>
                </div>
                {/* <p className="font-bold font-poppins text-default-700 text-base">
                  Messages
                </p> */}
                <div className="max-w-40 overflow-hidden flex items-center gap-[2px]">
                    <UserCard userFullnames={`${receiver_names}`} srcTxt={receiver_avatar_url} />
                    {receiverId === senderId && (<p className="antialiased text-primary-500 text-base font-medium font-poppins">(You)</p>)}

                </div>
              </DrawerHeader>
              <DrawerBody >
                <div className="h-full overflow-y-auto overflow-hidden p-2 bg-white shadow flex flex-col-reverse gap-2">
                  {messages.map((msg) => (
                    <p
                      // key={msg.id}
                      key={`${crypto.randomUUID()}`}
                      className={`px-3 py-1 my-1 max-w-full hyphens-auto break-words rounded text-wrap antialiased font-inter font-semibold ${msg.sender_id === senderId ? "bg-blue-400 text-white self-end rounded-tr-2xl" : "bg-gray-300 text-black self-start rounded-tl-2xl"}`}
                    >
                      {msg.content}
                    </p>
                  ))}
                  {/* <div ref={bottomRef} ></div> */}
                </div>
              </DrawerBody>
              <DrawerFooter className="items-end">
                <Form onSubmit={handleSendMessage} className="w-full flex items-end flex-row justify-between">
                    <Textarea
                    type="text"
                    className="w-full p-2 border rounded mt-2 text-sm sm:text-base antialiased font-inter font-semibold"
                    value={newMessage}
                    ref={messageTextAreaRef}
                    onChange={handleMessageTextChange}
                    placeholder="Type a message..."
                    />
                    <Button
                    type="submit"
                    className="mt-2 p-2 bg-default-500 text-white rounded antialiased font-semibold text-base"
                    >
                    Send
                    </Button>
                </Form>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MessagesBox;
