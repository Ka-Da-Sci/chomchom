import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Divider,
  Button,
} from "@heroui/react";
import BrandLogo from "./BrandLogo";
import authenticateUser from "@/handlers/supabase-authentication";
import { useAuthContext } from "@/hooks/useAuthContext";
import userIcon from "@/assets/images/user-icon.jpeg";
import { Link, useLocation } from "react-router-dom";
import NavBarLink from "./NavBarLink";
import Search from "./Search";
import { useEffect } from "react";

const { signInWithGooglePopup, signOutGoogle } = authenticateUser;

/* eslint-disable no-console */
const DefaultNavbar = () => {
  const { session, setSession } = useAuthContext();
  const { pathname } = useLocation();
  console.log(session?.user);

  // Prevent overflow flash on dropdown close
  useEffect(() => {
    const handleDropdownOpen = () => {
      document.body.classList.add("dropdown-open");
    };
    const handleDropdownClose = () => {
      document.body.classList.add("dropdown-closing");
      setTimeout(() => {
        document.body.classList.remove("dropdown-closing");
        document.body.classList.remove("dropdown-open");
      }, 300); // Match your dropdown's animation duration
    };

    const dropdownTrigger = document.querySelector(".dropdown-trigger");
    if (dropdownTrigger) {
      dropdownTrigger.addEventListener("click", handleDropdownOpen);
    }
    document.addEventListener("click", (e) => {
      if (!dropdownTrigger?.contains(e.target as Node)) {
        handleDropdownClose();
      }
    });

    return () => {
      if (dropdownTrigger) {
        dropdownTrigger.removeEventListener("click", handleDropdownOpen);
      }
      document.removeEventListener("click", handleDropdownClose);
    };
  }, []);

  return (
    <Navbar maxWidth="full" className="bg-white z-40 overflow-hidden">
      <NavbarContent>
        <NavbarContent className="w-full overflow-hidden" justify="start">
          <NavbarBrand>
            <Link className="flex w-full items-center" to="/">
              <BrandLogo />
              <p
                className={`hidden md:block font-normal text-inherit antialiased ${
                  pathname === "/" ? "text-primary-500" : ""
                }`}
              >
                Fotox
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="px-4 flex gap-3">
          <NavbarItem className="hidden sm:block">
            <NavBarLink pathName="/" toProp="/" lintText="Home" />
          </NavbarItem>
          {session && (
            <NavbarItem className="hidden sm:block">
              <NavBarLink
                pathName="/my-fotox"
                toProp="/my-fotox"
                lintText="My Fotox"
              />
            </NavbarItem>
          )}
          {session && (
            <NavbarItem className="hidden sm:block">
              <NavBarLink
                pathName="/profile/me"
                toProp="/profile/me"
                lintText="Account"
              />
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent
          as="div"
          className="items-center px-2 [@media(min-width:350px)]:min-w-[200px] [@media(max-width:490px)]:min-w-0"
          justify="end"
        >
          {!pathname.includes("/fotox/") ? <Search /> : ""}
          <Dropdown className="rounded-sm">
            <DropdownTrigger className="dropdown-trigger">
              <Avatar
                isBordered
                as="button"
                className="transition-transform w-full h-full max-w-8 max-h-8"
                color={`${pathname === "/profile/me" ? "primary" : "default"}`}
                name={session ? session?.user?.user_metadata.name : ""}
                src={
                  session
                    ? `${session?.user?.user_metadata.avatar_url}`
                    : userIcon
                }
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className={`h-screen w-full min-w-[200px] py-2 gap-4 flex flex-col ${
                session ? "" : "justify-center"
              }`}
            >
              <DropdownItem
                classNames={{
                  base: "my-0 mx-2 p-0 hover:outline-none",
                  wrapper: "m-0 p-0 hover:outline-none",
                }}
                key="user"
                textValue="user"
                className={`gap-2 max-h-min w-full max-w-[95%] ${session ? "pointer-events-none" : ""}`}
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
                  <div className="antialiased flex flex-col gap-2 h-full items-center font-inter text-default-500 dark:text-default-400">
                    <p>{session ? session?.user?.user_metadata.name : ""}</p>
                    <p>{session ? session?.user?.user_metadata.email : ""}</p>
                  </div>
                )}
              </DropdownItem>
              {session && (
                <DropdownItem
                  key="divider"
                  textValue="divider"
                  className="pointer-events-none"
                >
                  <Divider key="hrule" />
                </DropdownItem>
              )}

              {session && (
                <DropdownItem
                  classNames={{
                    base: "my-0 mx-2 mr-2 p-0 hover:outline-none",
                    wrapper: "m-0 p-0 hover:outline-none",
                  }}
                  className="antialiased mt-2 block sm:hidden max-h-min w-full max-w-[95%]"
                  key="home"
                  textValue="home"
                >
                  <NavBarLink pathName="/" toProp="/" lintText="Home" />
                </DropdownItem>
              )}
              {session && (
                <DropdownItem
                  classNames={{
                    base: "my-0 mx-2 p-0 hover:outline-none",
                    wrapper: "m-0 p-0 hover:outline-none",
                  }}
                  className="antialiased block sm:hidden max-h-min w-full max-w-[95%]"
                  key="my fotox"
                  textValue="my fotox"
                >
                  <NavBarLink
                    pathName="/my-fotox"
                    toProp="/my-fotox"
                    lintText="My fotox"
                  />
                </DropdownItem>
              )}
              {session && (
                <DropdownItem
                  classNames={{
                    base: "my-0 mx-2 p-0 hover:outline-none",
                    wrapper: "m-0 p-0 hover:outline-none",
                  }}
                  className="antialiased block sm:hidden max-h-min w-full max-w-[95%]"
                  key="account"
                  textValue="account"
                >
                  <NavBarLink
                    pathName="/profile/me"
                    toProp="/profile/me"
                    lintText="Account"
                  />
                </DropdownItem>
              )}

              {session && (
                <DropdownItem
                  classNames={{
                    base: "my-0 mx-2 p-0 hover:outline-none",
                    wrapper: "m-0 p-0 hover:outline-none",
                  }}
                  textValue="signout"
                  key="signout"
                  color="danger"
                  className="mt-4 mb-2 w-full max-w-[95%]" // Push to bottom with slight margin
                >
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
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </NavbarContent>
      <Divider className="bg-[#dcdcdc] w-full h-[1px] absolute top-0 left-0 inset-0 mt-16" />
    </Navbar>
  );
};

export default DefaultNavbar;

// @layer base {
//   body.dropdown-open {
//     @apply overflow-hidden;
//   }
//   body.dropdown-closing {
//     @apply overflow-hidden !important; /* Note: !important here for precedence */
//   }
// }

// /* Components layer: Styled UI components */
// @layer components {
//   .dropdown-menu {
//     @apply transition-opacity duration-300 ease-in-out relative overflow-y-auto;
//   }
//   .dropdown-menu[aria-hidden="true"] {
//     @apply opacity-0 pointer-events-none;
//   }
//   .dropdown-menu > div {
//     @apply relative h-full;
//   }
// }
