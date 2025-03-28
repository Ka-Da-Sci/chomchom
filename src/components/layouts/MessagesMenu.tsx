// import React from "react";
import {
  Drawer,
  DrawerContent,
  Button,
  useDisclosure,
  DrawerBody,
  DrawerHeader,
  Divider,
} from "@heroui/react";

import MessageIcon from "../ui/MessageIcon";

import { ReactNode } from "react";

const MessagesMenu = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

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
        // isDismissable={false}
        isOpen={isOpen}
        size={"lg"}
        hideCloseButton={true}
        onClose={onClose}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col items-center gap-0 m-0 mb-4 p-0">
                <div className="flex items-center gap-4 mr-auto ml-2">
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

                  {/* <Input
                  classNames={{
                    base: "base-classes",
                    label: "label-classes",
                    mainWrapper: "main-wrapper-classes",
                    inputWrapper: "input-wrapper-classes",
                    innerWrapper: "inner-wrapper-classes",
                    input: "input-classes",
                  }}
                  type="text"
                  placeholder="Search Direct Messages"
                  className="w-full rounded-lg border focus:outline-none"
                  /> */}
                </div>
                <Divider />
              </DrawerHeader>
              <DrawerBody className="px-0 mx-0 w-full">{children}</DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MessagesMenu;
