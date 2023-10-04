import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Instagram, Facebook, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <Container>
        <Row>
          <Col md={6} style={{ borderRight: "3px dashed grey" }}>
            <h5>Contact Us</h5>
            <p>
              Have questions or need assistance? Contact us at
              support@bookstore@outlook.com.
            </p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <p>
              Stay updated with our latest books and promotions on social media.
            </p>
            <div>
              <span style={{ padding: "10px" }}>
                <Facebook style={{ cursor: "pointer" }} />
              </span>
              <span style={{ padding: "10px" }}>
                <Instagram style={{ cursor: "pointer" }} />
              </span>
              <span style={{ padding: "10px" }}>
                <Twitter style={{ cursor: "pointer" }} />
              </span>
            </div>{" "}
          </Col>
        </Row>
        <hr />
        <div className="text-center">
          <p>&copy; 2023 Bookstore. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
