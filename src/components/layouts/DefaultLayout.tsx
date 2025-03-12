import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import DefaultNavbar from "../ui/DefaultNavbar";
import { Link } from "react-router";
import BrandLogo from "../ui/BrandLogo";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="relative w-full max-w-[1440px] mx-auto flex flex-col font-poppins">
      <CardHeader className="fixed pt-0">
        <DefaultNavbar />
      </CardHeader>

      <CardBody className="container mx-auto max-w-7xl px-4 sm:px-6 flex-grow pt-24">
        {children}
      </CardBody>

      <CardFooter className="relative container mx-auto flex flex-col items-center sm:w-[90%]">
        <div className="flex gap-20 justify-between w-full">
          <div className="flex gap-3 sm:flex-col">
            <Link className="flex w-max items-start" to="/">
              <BrandLogo height={40} width={40} />
            </Link>
          </div>
          <div className="flex gap-4 w-full max-w-[70%] justify-between items-end">
            <Link className="font-montserrat font-medium text-sm text-default-700" to={"/"}>Home</Link>
            <Link className="font-montserrat font-medium text-sm text-default-700" to={"/about-fotox"}>About Fotox</Link>
            <Link className="font-montserrat font-medium text-sm text-default-700" to={"/contact-support"}>Contact Support</Link>
            <Link className="font-montserrat font-medium text-sm text-default-700" to={"/privacy-policy"}>Privacy Policy</Link>
          </div>
        </div>
        <Divider className="bg-[#0e0d0d] mt-4" />
        <p className="font-montserrat font-medium text-sm text-default-900">
          @{<span>{new Date().getFullYear()}</span>} Fotox Inc. All rights
          reserved.
        </p>
      </CardFooter>
    </Card>
    // <div className="relative w-full max-w-[1440px] mx-auto flex flex-col h-screen font-poppins">
    //   <DefaultNavbar />
    //   <main className="container mx-auto max-w-7xl px-4 sm:px-6 flex-grow pt-4">
    //     {children}
    //   </main>

    // </div>
  );
};

export default DefaultLayout;
