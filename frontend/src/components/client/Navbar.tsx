import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  // NavbarItem,
  // Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { SearchIcon } from "../SearchIcon";
import { useSelector } from "react-redux";

export default function Nav() {
  const user = useSelector((state) => state.user.user);
  return (
    <Navbar isBordered className="px-4">
      <NavbarContent justify="start">
        <NavbarBrand className="">
          <p className="hidden sm:block font-bold text-black">
            Books on Campus
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center " justify="end">
        <Input
          classNames={{
            base: "w-[200px] sm:max-w-[12rem] h-10 mr-6",
            mainWrapper: "h-full",
            input: "text-small ",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Button color="warning">Apply to Have a Store</Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
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
    </Navbar>
  );
}
