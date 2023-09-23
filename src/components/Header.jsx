import React, { useEffect, useState } from "react";
import { Container, Button, Dropdown, Row } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./css/header.css";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Dribbble, JournalBookmarkFill, PlusLg } from "react-bootstrap-icons";
import AddBooksModal from "./addBooksModal";
import { JournalText, PersonCircle } from "react-bootstrap-icons";

const Header = () => {
  // const localCurrentUser = localStorage.getItem("user");
  const signOut = useLogout();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [admin, setAdmin] = useState(localStorage.getItem("role"));
  const [showHeader, setShowHeader] = useState(true);
  const allowedRoles = [1993];
  const localUser = localStorage?.getItem("role");
  const [showDropdown, setShowDropdown] = useState(false);
  const name = localStorage.getItem("name");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

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
          <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
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
              variant="outline-light"
              onClick={() => navigate("/books")}
              // style={{ marginRight: "40px" }}
              id="buttonPadding"
            >
              <JournalText
                size={20}
                style={{ marginRight: "5px", marginBottom: "3px" }}
              />
              {"Books"}
            </Button>
            {admin && (
              <Button variant="dark" id="buttonPadding" onClick={addBooksClick}>
                {
                  <PlusLg
                    size={20}
                    style={{ marginRight: "5px", marginBottom: "3px" }}
                  />
                }
                {"Add books"}
              </Button>
            )}
            {/* <PersonCircle
              color="white"
              size={30}
              style={{
                marginLeft: "10px",
                marginTop: "4px",
                cursor: "pointer",
              }}
            /> */}
            <Dropdown
              align="end"
              show={showDropdown}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {name}
                <PersonCircle
                  color="white"
                  size={30}
                  style={{
                    cursor: "pointer",
                    marginLeft: "5px",
                  }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* Add your dropdown menu items here */}
                <Dropdown.Header>
                  Hello {name || "user"} {admin && <div> Admin account</div>}
                </Dropdown.Header>
                <Dropdown.Item>Rented books</Dropdown.Item>
                <Dropdown.Item>Wish list</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => navigate("/accountsettings")}>
                  Account Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Row>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={LogOut}
                      id="textColour"
                    >
                      Log Out
                    </Button>
                  </Row>
                </Dropdown.Item>
                {/* Add more options as needed */}
              </Dropdown.Menu>
            </Dropdown>
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
