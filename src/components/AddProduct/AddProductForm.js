"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import "../signup-or-signin/SigninOrSignUp.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";
import { uploadImage } from "@/Utils/Utils";
import axios from "axios";
import useComponentLoader from "@/Hooks/useComponentLoader";
import toast from "react-hot-toast";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddProductForm({ setSignUpOrSignIn }) {
  const [loading, setLoading] = React.useState(false);
  const navgate = useRouter();
  const Loader = useComponentLoader();
  const ref = React.useRef();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { name, imageFile, description } = data;

    const price = parseFloat(parseFloat(data.price).toFixed(2));
    const formData = new FormData();
    formData.append("image", imageFile[0]);
    const imgUrl = await uploadImage(formData);
    const product = { name, imgUrl, description, price };
    await axiosSecure.post("/api/admin/product", product);
    setLoading(false);
    ref.current.reset();
    toast.success("Product add successful");
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
            <FaShoppingCart />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
            ref={ref}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Product name"
                  autoFocus
                  {...register("name", { required: true })}
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
                  label="Description"
                  name="description"
                  autoComplete="email"
                  {...register("description", { required: true })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Price"
                  type="number"
                  id="password"
                  autoComplete="new-password"
                  {...register("price", { required: true })}
                />
              </Grid>
              <div className="pt-4 pl-4 w-full">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "black !important",
                    color: "white !important",
                  }}
                >
                  {loading ? Loader : "Add Product"}
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
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
