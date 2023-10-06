import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useNavigate, useLocation } from "react-router-dom";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [path, setPath] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    setPath(currentPath);
  }, [location.pathname]);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(30, 0, 0, 0.8)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.7)",
        borderRadius: "0px 0px 10px 10px ",
        position: "fixed",
        zIndex: 4,
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
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <Box sx={{ flexGrow: 0 }}>
            {path === "/login" ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
