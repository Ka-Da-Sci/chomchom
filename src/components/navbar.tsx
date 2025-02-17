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
    Image,
    Divider
  } from "@heroui/react";
import xalphabetLogo from '../assets/images/logo-trans.svg';
import { div } from "framer-motion/client";
// import clsx from "clsx";

  
  export const BrandLogo = () => {
    return (
      <Image height={25} width={25} alt="xalphabet brand logo" src={xalphabetLogo} />
    );
  };
  
  export const SearchIcon = ({size = 24, strokeWidth = 1.5, width, height, ...props}) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height={height || size}
        role="presentation"
        viewBox="0 0 24 24"
        width={width || size}
        {...props}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  };
  
  const DefaultNavbar = () => {
    return (
        <Navbar maxWidth="full" className="bg-white">
          <NavbarContent className="md:container md:mx-auto">
            <NavbarContent className="w-full overflow-hidden" justify="start">
              <NavbarBrand>
                <Link className="flex w-full items-center" href="/">
                  <BrandLogo />
                  <p className="hidden sm:block font-bold text-inherit antialiased" >Chommie</p>
                </Link>
              </NavbarBrand>
              
            </NavbarContent>

            <NavbarContent justify="center" className="px-4 hidden md:flex gap-3">
                <NavbarItem isActive>
                  <Link className="antialised" color="foreground" href="#">
                    Features
                  </Link>
                </NavbarItem>
                <NavbarItem isActive>
                  <Link className="antialised" aria-current="page" color="foreground" href="#">
                    Customers
                  </Link>
                </NavbarItem>
                <NavbarItem isActive>
                  <Link className="antialised" aria-current="page"  color="foreground" href="#">
                    Integrations
                  </Link>
                </NavbarItem>
            </NavbarContent>
      
            <NavbarContent as="div" className="items-center px-2  [@media(min-width:350px)]:min-w-[200px] [@media(max-width:490px)]:min-w-0" justify="end">
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
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">zoey@example.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings">My Settings</DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">Configurations</DropdownItem>
                  <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </NavbarContent>
          <Divider className="bg-[#dcdcdc] w-full h-[1px] absolute top-0 left-0 inset-0 mt-16" />
        </Navbar>
    );
  }

export default DefaultNavbar;
  