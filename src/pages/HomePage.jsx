import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import "./css/home.css";
import CarouselComponent from "../components/CarouselComponent";
const HomePage = () => {
  return (
    <>
      <Header />
      <div id="backGnd">
        <Row>
          <div>
            <CarouselComponent />
          </div>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
