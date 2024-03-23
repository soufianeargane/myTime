import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import axiosInstance from "../../api/axiosInstance";

// Define the type for the children prop
interface LayoutDesignProps {
  children: React.ReactNode;
}

export default function LayoutDesign({ children }: LayoutDesignProps) {
  React.useEffect(() => {
    document.title = "My time - Admin";
  }, []);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  // Define the type for the event parameter
  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Define the type for the newOpen parameter
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link to="/admin/requests">
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Requests"} />
            </ListItemButton>
          </Link>
          <Link
            to="/admin/dashboard"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"dashboard"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box sx={{ flexGrow: 1, backgroundColor: "#0070F0" }}>
        <AppBar position="static" sx={{ backgroundColor: "#0070F0" }}>
          <Toolbar>
            <IconButton
              onClick={toggleDrawer(true)}
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="div" sx={{ flexGrow: 1 }}>
              Admin
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <div>{children}</div>
    </div>
  );
}
