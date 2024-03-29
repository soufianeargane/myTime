import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Cart from "./Cart";
import axiosInstance from "../../api/axiosInstance";
import { setUser } from "../../store/userSlice";

export default function Nav() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setShowCard(location.pathname.includes("store"));
  }, [location.pathname]);

  const user = useSelector((state) => state.user.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showCard, setShowCard] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  const handleApplyClick = (event) => {
    event.preventDefault();
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(setUser(null));
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="px-4"
    >
      {/* <Cart /> */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarContent justify="start">
        <NavbarBrand className="">
          <Link to="/client/home">
            <p className="hidden sm:block font-bold text-black">
              Books on Campus
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center " justify="end">
        <Button color="warning">
          <Link to="/client/apply">apply to have a store </Link>
        </Button>
        {showCard && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger
              onClick={() => {
                setCartOpen(!cartOpen);
                console.log("clickedsss");
              }}
            >
              {/* this is to display the CART */}
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg"
              />
            </DropdownTrigger>
            <div></div>
          </Dropdown>
        )}
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
            <DropdownItem onClick={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <Cart isOpen={cartOpen} setCartOpen={setCartOpen} />
    </Navbar>
  );
}
