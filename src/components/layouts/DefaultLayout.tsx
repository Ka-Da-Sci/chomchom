import { Card, CardFooter, CardHeader, Divider } from "@heroui/react";
import DefaultNavbar from "../ui/DefaultNavbar";
import { Link } from "react-router";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="relative w-full max-w-[1440px] mx-auto flex flex-col font-poppins h-screen justify-between overflow-y-scroll">
      <CardHeader className="fixed pt-0">
        <DefaultNavbar />
      </CardHeader>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 pt-24">
        {children}
      </div>

      <CardFooter className="relative container mx-auto flex flex-col items-center rounded-none overflow-visible">
          <div className="flex gap-4 w-full  justify-center sm:justify-between items-end flex-wrap px-4">
            <Link className="font-montserrat font-medium text-xs text-default-700" to={"/about-fotox"}>About Fotox</Link>
            <Link className="font-montserrat font-medium text-xs text-default-700" to={"/contact-support"}>Contact Support</Link>
            <Link className="font-montserrat font-medium text-xs text-default-700" to={"/privacy-policy"}>Privacy Policy</Link>
          </div>
        <Divider className="bg-default-400 mt-4" />
        <p className="font-montserrat font-medium text-xs text-default-900">
          Copyright ©{<span>{new Date().getFullYear()}</span>} Xalphabet Inc. All rights reserved.
        </p>
      </CardFooter>
    </Card>
  );
};

export default DefaultLayout;
