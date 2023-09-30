import React, { useState } from "react";
import Header from "../components/MuiHeader";
import { Container, Row } from "react-bootstrap";
import PurchaseForm from "../components/PurchaseForm";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  CreditCard,
  AccountBalance,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import { Form } from "react-bootstrap";

const PurchasePage = () => {
  const name = localStorage.getItem("name");
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");

  const [alignment, setAlignment] = useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <Header />
      <Container style={{ maxWidth: "500px" }}>
        <br />
        <br />
        <br />
        <h4 style={{ color: "grey", textAlign: "center" }}>Enter details</h4>

        <div>
          <PurchaseForm name={name} user={user} userId={userId} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" size="medium" href="#payment">
            <KeyboardDoubleArrowDown />
            Proceed to payment
          </Button>
        </div>
        <br />
        <Container fluid style={{ borderTop: "3px dashed grey" }} id="payment">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <CreditCard />
                Card
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <AccountBalance />
                UPI
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <br />
          {alignment === "left" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Card no.</Form.Label>
                <Form.Control type="number" placeholder="Enter your Card no." />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name :</Form.Label>
                <Form.Control type="text" placeholder="Enter your fullname" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CVV code :</Form.Label>
                <Form.Control type="number" placeholder="Enter your CVV code" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount :</Form.Label>
                <Form.Control type="number" disabled />
              </Form.Group>
            </div>
          ) : alignment === "right" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>UPI id</Form.Label>
                <Form.Control type="text" placeholder="Enter your UPI id" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount :</Form.Label>
                <Form.Control type="number" disabled />
              </Form.Group>
            </div>
          ) : (
            <p style={{ color: "grey", textAlign: "center" }}>
              Select one payment method to proceed.
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" size="large" color="success">
              Rent book
            </Button>
          </div>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default PurchasePage;
