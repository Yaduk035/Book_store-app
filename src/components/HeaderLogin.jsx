import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const localCurrentUser = localStorage.getItem("user");
  const { auth } = useAuth();
  const authCurrentUser = auth.user;
  const logOut = useLogout();
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" id="textColour">
            Navbar
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#home" id="textColour">
              Home
            </Nav.Link>
            <Nav.Link href="#features" id="textColour">
              Features
            </Nav.Link>

            <Nav.Link onClick={() => navigate("/signup")} id="textColour">
              Sign Up
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
