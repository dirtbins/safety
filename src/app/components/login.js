"use client";
import React, { useContext, useReducer } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { Alert, Snackbar, formControlClasses } from "@mui/material";
import {
  UserContext,
  loginFormReducer,
  loadingSpinnerReducer,
} from "../reducers/login-reducer";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import Cookies from "js-cookie";
import AlertDialog from "./dialog-alert.";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const initialFormState = {
  email: "",
  password: "",
  name: "",
  loading: false,
};
const initialLoading = { loading: false };
export default function SignInSide() {
  const router = useRouter();
  const [formState, dispatch] = useReducer(loginFormReducer, initialFormState);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [content, setContent] = useState("");

  const [title, setTitle] = useState("");

  function toDashboard() {
    router.push("/dashboard");
    setLoading(false);
  }
  const [showToast, setShowToast] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = showToast;

  const handleTextChange = (e) => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((response) => {
      return response.json();
    });
    if (response.length > 0) {
      console.log(response);
      Cookies.set("currentUser", JSON.stringify(response));

      setTimeout(function () {
        toDashboard();
      }, 5000);
    } else {
      setLoading(false);
      setTitle("Login Error");
      setContent("Incorrect email or password");
      setOpenDialog(true);
    }
  };

  const handleToast = (newState) => () => {
    setShowToast({ ...newState, open: true });
  };

  const handleCloseToast = () => {
    setShowToast({ ...showToast, open: false });
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const forgotPassword = () => {
    setTitle("Unathorized");
    setContent("Please contact system admin");
    setOpenDialog(true);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        message="Please contact your system administrator"
      >
        <Alert
          onClose={handleCloseToast}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please contact your system administrator!
        </Alert>
      </Snackbar>
      <Grid container component="main" sx={{ height: "80vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('/images/splash.jpg')",
            backgroundRepeat: "no-repeat",
            marginTop: "-350px",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                // onChange={(e) => handleTextChange(e)}
                autoFocus
                variant="filled"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                // onChange={(e) => handleTextChange(e)}
                variant="filled"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    onClick={() => forgotPassword()}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
