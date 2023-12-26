"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import "../SigninOrSignUp.css";
import useAuth from "@/Hooks/useAuth";
import { styled } from "@mui/material/styles";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ setSignUpOrSignIn }) {
  const { SignUp } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const { firstName, lastName, imageFile, email, password } = data;
    const formData = new FormData();
    formData.append("image", imageFile[0]);
    SignUp(`${firstName} ${lastName}`, email, password, formData);
    setLoading(false);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="pb-20">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", { required: true })}
                />
              </Grid>
              <div className="pt-4 pl-4">
                <label className="block">
                  <span className="mb-3 text-[#666666] inline-block">
                    Choose profile photo
                  </span>
                  <input
                    {...register("imageFile", { required: true })}
                    type="file"
                    className="block w-full text-sm text-gray-500
      file:me-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-black file:text-white
      hover:file:bg-black
      file:disabled:opacity-50 file:disabled:pointer-events-none
      dark:file:bg-black
      dark:hover:file:bg-black
    "
                  />
                </label>
              </div>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={true}
                      {...register("checkBox", { required: true })}
                    />
                  }
                  label="I agree to the terms and conditions"
                />
              </Grid>
              <div className="pt-4 pl-4 w-full">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
                >
                  {loading ? loader : "Sign Up"}
                </Button>
              </div>
            </Grid>
            {Object.keys(errors).length !== 0 ? (
              <span className="text-red-500 mt-4 inline-block">
                Please, fill required feild
              </span>
            ) : (
              <></>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <button type="button" variant="body2">
                  Already have an account?{" "}
                  <span
                    onClick={() => setSignUpOrSignIn("SignIn")}
                    className="text-blue-500"
                  >
                    Sign In
                  </span>
                </button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
