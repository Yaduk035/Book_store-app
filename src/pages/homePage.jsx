import React from "react";
import "./css/homePage.css";
import { Row, Col, Container, Image } from "react-bootstrap";
import profileIcon from "../images/icons/92507bdcf4b5edfa12d5e9cc4f01b301.png";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import { useState } from "react";
import { Button } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const HomePage = () => {
  const [users, setUsers] = useState("");
  const { auth } = useAuth;
  console.log(auth);

  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const showUsers = async () => {
    try {
      const response = await axiosPrivate.get("/users", {
        signal: controller.signal,
      });
      console.log(response);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Header />
          <Col md={3} className="profileDiv">
            <Image src={profileIcon} thumbnail className="profileIcon" />
            {/* <h5 className="ms-auto">@{username}</h5> */}
          </Col>
        </Row>
      </Container>

      <Container>
        <Button onClick={showUsers}>Get users</Button>
        <h2>Users List</h2>
        {users?.length ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user?.username}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
      </Container>
    </>
  );
};

export default HomePage;
