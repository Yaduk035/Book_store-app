import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const localCurrentUser = localStorage.getItem("user");
  const { auth } = useAuth();
  const authCurrentUser = auth.user;
  const logOut = useLogout();

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

            {localCurrentUser && (
              <Nav.Link onClick={logOut} id="textColour">
                Log Out
              </Nav.Link>
            )}
            <Nav.Link onClick={logOut} style={{ color: "grey" }}>
              altLogout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
