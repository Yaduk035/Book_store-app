import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { JournalBookmarkFill, PlusLg } from "react-bootstrap-icons";
import AddBooksModal from "./addBooksModal";

const Header = () => {
  // const localCurrentUser = localStorage.getItem("user");
  const signOut = useLogout();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [admin, setAdmin] = useState(localStorage.getItem("role"));
  const [showHeader, setShowHeader] = useState(true);
  const allowedRoles = [1993];
  const localUser = localStorage?.getItem("role");

  const LogOut = () => {
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
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ minHeight: "70px" }}>
        <Container>
          <span onClick={() => navigate("/")}>
            <JournalBookmarkFill
              color="white"
              size={30}
              style={{ paddingRight: "5px", paddingBottom: "5px" }}
            />
            <Navbar.Brand id="textColour" onClick={() => navigate("/")}>
              Book Store
            </Navbar.Brand>
          </span>

          <Nav className="ml-auto">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => navigate("/books")}
              // style={{ marginRight: "40px" }}
              id="buttonPadding"
            >
              {"Books"}
            </Button>
            {/* <Nav.Link href="#features" id="textColour">
              Features
            </Nav.Link> */}
            {/* {role &&
            } */}
            {admin && (
              <Button
                variant="outline-info"
                id="buttonPadding"
                onClick={addBooksClick}
              >
                {
                  <PlusLg
                    size={20}
                    style={{ marginRight: "5px", marginBottom: "3px" }}
                  />
                }
                {"Add books"}
              </Button>
            )}
            <Button variant="danger" onClick={LogOut} id="textColour">
              Log Out
            </Button>

            {/* <Nav.Link onClick={logOut} style={{ color: "grey" }}>
              altLogout
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <AddBooksModal showModal={showModal} closeModal={closeModal} />
    </>
  );
};

export default Header;
