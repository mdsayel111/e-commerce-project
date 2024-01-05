"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/legacy/image";
import "./Navbar.css";
import Link from "next/link";
import useAuth from "@/Hooks/useAuth";
import { Button } from "@mui/material";
import Logo from "./Logo";
import { useRouter } from "next/navigation";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up(500)]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, role, SignOut } = useAuth();
  const router = useRouter();

  console.log(role);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    SignOut();
    localStorage.removeItem("token");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchString = e.target.searchString.value;
    router.push(`/products?search=${searchString}`);
    router.refresh();
  };

  return (
    <AppBar position="sticky" sx={{ top: "0" }}>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "white", color: "black" }}
      >
        <div className="flex justify-between items-center">
          <Logo />

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: "20px" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mr: "20px",
              }}
            >
              <MenuItem id="menu-item" className="flex flex-col p-4">
                <Typography textAlign="center">
                  <Link
                    href={"/"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Home
                  </Link>
                </Typography>
                <Typography textAlign="center">
                  <Link
                    href={"/products?search=all"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Products
                  </Link>
                </Typography>
                <Typography textAlign="center">
                  {role === "admin" ? (
                    <Link
                      href={"/admin/dashboard/all-product"}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "block" }}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <></>
                  )}
                </Typography>
                <Typography textAlign="center">
                  <Link
                    href={"/cart"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "black", display: "block" }}
                  >
                    Cart
                  </Link>
                </Typography>
                <Typography textAlign="center">
                  {user ? (
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ backgroundColor: "black !important" }}
                      onClick={logOut}
                    >
                      Log Out
                    </Button>
                  ) : (
                    <Link
                      href={"/signup-or-signin"}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "black", display: "block" }}
                    >
                      SignUp Or SignIn
                    </Link>
                  )}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "16px",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            <Link
              href={"/"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Home
            </Link>
            <Link
              href={"/products?search=all"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Products
            </Link>
            <Link
              href={"/cart"}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Cart
            </Link>
            {role === "admin" ? (
              <Link
                href={"/admin/dashboard/all-product"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Dashboard
              </Link>
            ) : (
              ""
            )}
            {user ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "black !important" }}
                onClick={logOut}
              >
                Log Out
              </Button>
            ) : (
              <Link
                href={"/signup-or-signin"}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                SignUp Or SignIn
              </Link>
            )}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              border: "2px solid black",
              borderRadius: "10px",
              width: { xs: "150px", md: "auto", lg: "auto" },
              display: { xs: "none", md: "flex" },
            }}
          >
            <form onSubmit={handleSearch}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  name="searchString"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </form>
          </Box>
        </div>
      </Container>
    </AppBar>
  );
}
export default Navbar;
