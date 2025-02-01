// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Chip } from "@mui/material";
import { axiosPrivate } from "../api/axios";

import React, { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { PlusLg } from "react-bootstrap-icons";
import AddBooksModal from "../components/addBooksModal";
import { JournalText } from "react-bootstrap-icons";
import { Divider, capitalize } from "@mui/material";
import { Logout } from "@mui/icons-material";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const signOut = useLogout();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [admin, setAdmin] = useState(localStorage.getItem("role"));
  const allowedRoles = [1993];
  const localUser = localStorage?.getItem("role");
  const name = localStorage.getItem("name") || "user";

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

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
    signOut();
    localStorage.setItem("role", "");
  };

  useEffect(() => {
    if (localUser) {
      // Split the localUser string into an array of roles
      const userRoles = localUser
        .split(",")
        .map((role) => parseInt(role.trim(), 10));

      // Use .some() to check if any of the allowedRoles exists in userRoles
      const roleExists = userRoles.some((role) => allowedRoles.includes(role));
      setAdmin(roleExists);
    } else {
      setAdmin(false);
    }
  });

  const addBooksClick = () => {
    setShowModal(true);
    setAnchorElNav(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(30, 0, 0, 0.8)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.7)",
        borderRadius: "0px 0px 10px 10px ",
        position: "fixed",
        zIndex: 4,
        backdropFilter: "blur(3px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStoriesIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            style={{ cursor: "pointer" }}
          >
            BOOKSTORE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              }}
            >
              <MenuItem onClick={() => navigate("/books")}>
                <Typography textAlign="center">All Books</Typography>
              </MenuItem>
              {admin && (
                <MenuItem onClick={addBooksClick}>
                  <Typography textAlign="center">Add book</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <AutoStoriesIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BOOKSTORE
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              paddingRight: "20px",
            }}
          >
            <Button
              onClick={() => navigate("/books")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <JournalText
                size={20}
                style={{ marginRight: "5px", marginBottom: "3px" }}
              />
              All Books
            </Button>
            {admin && (
              <Button
                onClick={addBooksClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <PlusLg
                  size={20}
                  style={{ marginRight: "5px", marginBottom: "3px" }}
                />
                Add book
              </Button>
            )}
          </Box>

          {!loggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/signup")}
                size="large"
                style={{ marginRight: "10px", color: "white" }}
              >
                Sign up
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/login")}
                size="large"
                style={{ marginRight: "10px", color: "white" }}
              >
                Log in
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={capitalize(name)}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Divider>
                  <Chip
                    label={admin ? <div> Admin</div> : <div>User account</div>}
                  />
                </Divider>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <span style={{ color: "grey" }}>Hello</span>{" "}
                    {name || "user"}
                  </Typography>
                </MenuItem>
                {admin && (
                  <span>
                    <Divider>
                      <Chip label="Admin only" />
                    </Divider>

                    <MenuItem onClick={() => navigate("/admincontrols")}>
                      <Typography textAlign="center">
                        Admin Dashboard
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/admincontrols/logs")}>
                      <Typography textAlign="center">
                        <span style={{ color: "gray" }}>Error & req logs</span>
                      </Typography>
                    </MenuItem>
                  </span>
                )}
                <Divider>
                  <Chip label="Books" />
                </Divider>
                <MenuItem onClick={() => navigate("/rentedbooks")}>
                  <Typography textAlign="center">Rented Books</Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate("/wishlist")}>
                  <Typography textAlign="center">Wish list</Typography>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <Divider>
                  <Chip label="Account" />
                </Divider>

                <MenuItem onClick={() => navigate("/accountsettings")}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <Divider
                  variant="middle"
                  style={{ background: "black" }}
                  sx={{ my: 1 }}
                />
                <MenuItem onClick={logOut}>
                  <Typography textAlign="center" color={"red"}>
                    <Logout style={{ marginBottom: "5px" }} />
                    <span
                      style={{ fontFamily: "monospace", fontSize: "1.1rem" }}
                    >
                      Log out
                    </span>
                  </Typography>
                </MenuItem>
                <AddBooksModal showModal={showModal} closeModal={closeModal} />
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
