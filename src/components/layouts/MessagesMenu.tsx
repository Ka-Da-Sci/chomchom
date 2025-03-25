// import React from "react";
import {
  Drawer,
  DrawerContent,
  Button,
  useDisclosure,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/react";

import MessageIcon from "../ui/MessageIcon";

const MessagesMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [size, setSize] = React.useState("md");

  //   const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];

  //   const handleOpen = () => {
  //     // setSize(size);
  //     onOpen();
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
                          <p className="font-bold font-poppins text-default-700 text-base">Messages</p>
                        </DrawerHeader>
                        <DrawerBody>
                          
                        </DrawerBody>
                        <DrawerFooter>
                          {/* <Button color="danger" variant="light" onPress={onClose}>
                            Close
                          </Button>
                          <Button color="primary" onPress={onClose}>
                            Action
                          </Button> */}
                        </DrawerFooter>
                      </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MessagesMenu;
