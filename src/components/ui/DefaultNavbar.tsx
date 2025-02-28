import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Divider,
  Button,
  DropdownSection,
} from "@heroui/react";
// import clsx from "clsx";
import BrandLogo from "./BrandLogo";
import SearchIcon from "./SearchIcon";
import authenticateUser from "@/handlers/supabase-authentication";
import { useAuthContext } from "@/hooks/useAuthContext";
import userIcon from '@/assets/images/user-icon.jpeg'

const { signInWithGooglePopup, signOutGoogle } = authenticateUser;

/* eslint-disable no-console */
const DefaultNavbar = () => {
  const { session, setSession } = useAuthContext();
  console.log(session?.user);

  return (
    <Navbar maxWidth="full" className="bg-white">
      <NavbarContent className="md:container md:mx-auto">
        <NavbarContent className="w-full overflow-hidden" justify="start">
          <NavbarBrand>
            <Link className="flex w-full items-center" href="/">
              <BrandLogo />
              <p className="hidden sm:block font-bold text-inherit antialiased">
                Chommie
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="px-4 hidden md:flex gap-3">
          <NavbarItem isActive>
            <Link className="antialised" color="foreground" href="#">
              Chommy
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              className="antialised"
              aria-current="page"
              color="foreground"
              href="#"
            >
              Chommy
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link
              className="antialised"
              aria-current="page"
              color="foreground"
              href="#"
            >
              Chommy
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent
          as="div"
          className="items-center px-2  [@media(min-width:350px)]:min-w-[200px] [@media(max-width:490px)]:min-w-0"
          justify="end"
        >
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10 [@media(max-width:350px)]:hidden",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search..."
            size="sm"
            startContent={<SearchIcon width={18} height={18} size={18} />}
            type="search"
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform w-full h-full max-w-8 max-h-8"
                color="secondary"
                name="Jason Hughes"
                src={
                  session
                    ? `${session?.user?.user_metadata.avatar_url}`
                    : userIcon
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="profile"
                textValue="Profile"
                className="gap-2"
              >
                {!session && (
                  <Button
                    className="capitalize w-full"
                    onPress={async () => {
                      await signInWithGooglePopup();
                    }}
                  >
                    Sign in
                  </Button>
                )}
                {session && (
                  <div className="flex flex-col gap-2 h-full items-center font-inter text-default-500 dark:text-default-400">
                    <p className="capitalize">Signed in as</p>
                    <p>{session ? session?.user?.user_metadata.name : ""}</p>
                    <p>{session ? session?.user?.user_metadata.email : ""}</p>
                  </div>
                )}
              </DropdownItem>
              { session && (<DropdownSection className="font-poppins font-bold">
                <DropdownItem key="divider" >
                  <Divider key="hrule" />
                </DropdownItem>
                <DropdownItem key="settings">Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="signout" color="danger">
                  <Button
                    color="danger"
                    className="capitalize w-full"
                    onPress={async () => {
                      await signOutGoogle().then((resolve) =>
                        setSession(resolve)
                      );
                    }}
                  >
                    Sign out
                  </Button>
                </DropdownItem>
              </DropdownSection>)}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>
      <Divider className="bg-[#dcdcdc] w-full h-[1px] absolute top-0 left-0 inset-0 mt-16" />
    </Navbar>
  );
};

export default DefaultNavbar;
