import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { JournalBookmark } from "react-bootstrap-icons";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState("");

  useEffect(() => {
    // Get the current path and log it to the console
    const currentPath = location.pathname;
    setPath(currentPath);
  }, [location.pathname]);

  return (
    <>
      <Navbar
        expand="xxl"
        fixed="sticky"
        bg="dark"
        data-bs-theme="dark"
        style={{ minHeight: "70px" }}
      >
        <Container>
          <span onClick={() => navigate("/")}>
            <JournalBookmark
              color="white"
              size={30}
              style={{ paddingRight: "5px", paddingBottom: "5px" }}
            />
            <Navbar.Brand id="textColour" onClick={() => navigate("/")}>
              Book Store
            </Navbar.Brand>
          </span>
          <Nav className="ml-auto">
            {path === "/login" ? (
              // <Nav.Link onClick={() => navigate("/signup")} id="textColour">
              //   Sign Up
              // </Nav.Link>

              <Button variant="info" onClick={() => navigate("/signup")}>
                Sign up
              </Button>
            ) : (
              <Button variant="info" onClick={() => navigate("/login")}>
                Log In
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
