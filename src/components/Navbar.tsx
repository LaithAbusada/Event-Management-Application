import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useUser } from "@auth0/nextjs-auth0/client";
import { login, logout } from "@/state/user/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { adminNavItems } from "./NavItems";
import { initialNavItems } from "./NavItems";
import log from "loglevel";
import { showToast } from "@/helpers/toast";
import { TOAST_TYPES } from "@/constants/toastEnums";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  windows?: () => Window;
}

const drawerWidth = 240;
export default function DrawerAppBar(props: Props) {
  const { windows } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userAuth = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { user, error, isLoading } = useUser();

  const [navItems, setNavItems] = React.useState(initialNavItems);
  const [color, setColor] = useState("transparent");
  useEffect(() => {
    if (error && !isLoading) {
      log.error("Error status:", error);
    }
    if (!user && !isLoading) {
      showToast(
        TOAST_TYPES.ERROR,
        "An error occurred while trying to log you in, please try again "
      );
    }
    if (user) {
      dispatch(login(user));
      setNavItems(adminNavItems);
    } else {
      dispatch(logout());
      setNavItems(initialNavItems);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(login(user));
      setNavItems(adminNavItems);
    } else {
      dispatch(logout());
      setNavItems(initialNavItems);
    }
  }, [user, dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setColor("#5d13cb");
      } else {
        setColor("transparent");
      }
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h1" sx={{ my: 2, fontSize: 30 }}>
        Event Management Application
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link href={item.path} passHref>
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    windows !== undefined ? () => windows().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          bgcolor: color,
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h1"
            component="div"
            className="text-white text-lg lg:text-4xl"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            Event Management Application
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link href={item.path} passHref key={item.name}>
                <Button
                  sx={{ mr: 8, color: "#fff" }}
                  className="text-sm lg:text-l hover:text-blue-500"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
