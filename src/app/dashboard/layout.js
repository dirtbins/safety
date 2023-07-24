"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AdbIcon from "@mui/icons-material/Adb";
import {
  AccountTree,
  EngineeringOutlined,
  EngineeringRounded,
  FolderSharedRounded,
  HistoryRounded,
  LogoutRounded,
  Person2Rounded,
  ReportProblemRounded,
  SettingsRounded,
  UploadFileRounded,
} from "@mui/icons-material";
import {
  Alert,
  Snackbar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import BasicSpeedDial from "../components/speed-dial";
import { Fragment } from "react";
import IncidentLog from "../components/log";
import Info from "../components/info-cards";
import Loading from "../components/loading";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AlertDialog from "../components/dialog-alert.";
import { usePathname } from "next/navigation";
import Projects from "./projects/page";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [showToast, setShowToast] = React.useState({
    opens: false,
    vertical: "top",
    horizontal: "center",
  });
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [content, setContent] = React.useState("");

  const [title, setTitle] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleToast = (newState) => () => {
    setShowToast({ ...newState, opens: true });
  };

  const logout = () => {
    router.push("/");
    setLoading(false);
    Cookies.remove("currentUser");
  };
  const handleSettingsIcons = (iconName) => {
    if (iconName == "Logout") {
      setLoading(true);
      setTimeout(() => {
        logout();
      }, 1000);
    } else if (iconName == "Dashboard") {
      router.push("/dashboard");
    } else if (iconName == "Projects") {
      router.push("/dashboard/projects");
    } else {
      setTitle("Limited Access");
      setContent("Please contact system admin");
      setOpenDialog(true);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { vertical, horizontal, opens } = showToast;

  const handleCloseToast = () => {
    setShowToast({ ...showToast, opens: false });
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Fragment>
      {loading && <Loading />}
      {openDialog && (
        <AlertDialog
          closeDialog={() => onCloseDialog()}
          content={content}
          title={title}
        />
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={opens}
        severity="error"
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message="Action not authorized, please contact administrator"
      >
        <Alert
          onClose={handleCloseToast}
          severity="error"
          sx={{ width: "100%" }}
        >
          Action not authorized, please contact administrator!
        </Alert>
      </Snackbar>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <AdbIcon sx={{ display: { xs: "flex" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              OSHPORTAL
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {[
              "Dashboard",
              "Upload Docs",
              "Messages",
              "Projects",
              "Report Incident",
              "Incident History",
            ].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  onClick={() => handleSettingsIcons(text)}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    onClick={() => handleSettingsIcons(text)}
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text === "Upload Docs" && <UploadFileRounded />}
                    {text === "Dashboard" && (
                      <AccountTree
                        sx={{ color: pathname === "/dashboard" && "#1976d2" }}
                      />
                    )}
                    {text === "Messages" && <MailIcon />}
                    {text === "Report Incident" && <ReportProblemRounded />}
                    {text === "Projects" && (
                      <FolderSharedRounded
                        sx={{
                          color:
                            pathname === "/dashboard/projects" && "#1976d2",
                        }}
                      />
                    )}
                    {text === "Incident History" && <HistoryRounded />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: open ? 1 : 0 }}
                    onClick={() => handleSettingsIcons(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["Profile", "Settings", "Logout"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    onClick={() => handleSettingsIcons(text)}
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {text === "Profile" && <Person2Rounded />}
                    {text === "Settings" && <SettingsRounded />}
                    {text === "Logout" && <LogoutRounded />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: open ? 1 : 0 }}
                    onClick={() => handleSettingsIcons(text)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {pathname === "/dashboard" && (
            <Fragment>
              <Info />
              <IncidentLog />
              <hr />
              <Projects />
            </Fragment>
          )}
          {pathname === "/dashboard/projects" && <Projects />}
        </Box>
      </Box>
      <BasicSpeedDial />
    </Fragment>
  );
}
