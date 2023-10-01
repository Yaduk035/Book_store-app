import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import { Container, Row } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import PurchaseForm from "../components/PurchaseForm";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import WishlistCard from "../components/WishlistCard";
import {
  CreditCard,
  AccountBalance,
  KeyboardDoubleArrowDown,
} from "@mui/icons-material";
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import SuccessAlert from "../components/SuccessAlertBar";

const PurchasePage = () => {
  const name = localStorage.getItem("name");
  const user = localStorage.getItem("user");
  const userId = localStorage.getItem("userId");
  const { bookId } = useParams();
  const localUserId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [alignment, setAlignment] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const [rentButton, setRentButton] = useState(false);
  const [bookData, setBookData] = useState();
  const [jsonData, setJsonData] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const [cardNo, setCardNo] = useState();
  const [cardName, setCardName] = useState("");
  const [Cvv, setCvv] = useState();
  const [amount, setAmount] = useState();
  const [upi, setUpi] = useState("");

  const [book_Id, setBook_Id] = useState("");
  const [bookName, setBookName] = useState("");
  const [image, setImage] = useState("");
  const [rentAmount, setRentAmount] = useState();
  const [author, setAuthor] = useState("");
  const [availability, setAvailability] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [rentPeriod, setRentPeriod] = useState("");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (alignment === "left" && cardNo && cardName && Cvv) {
      setRentButton(true);
    } else if (alignment === "right" && upi) {
      setRentButton(true);
    } else {
      setRentButton(false);
    }
  }, [cardName, cardNo, Cvv, upi, alignment]);

  const bookById = async () => {
    try {
      const response = await axios.get(`/books/${bookId}`);
      setBook_Id(response.data._id);
      setBookName(response.data.bookName);
      setImage(response.data.image);
      setRentAmount(response.data.rentAmount);
      setAuthor(response.data.setAuthor);
      setGenre(response.data.genre);
      setLanguage(response.data.language);
      setRentPeriod(response.data.rentPeriod);
      setAmount(response.data.rentAmount);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    bookById();
  }, []);

  const addToRentlist = async () => {
    try {
      const bookId = book_Id;
      const userId = localUserId;
      const rentlistData = { userId };

      const response = await axios.post(
        `books/rentlist/${bookId}`,
        rentlistData,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      showAlert();
      console.log("RentlistResponse : ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };
  const showAlert = () => {
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
      navigate("/rentedbooks");
    }, [2000]);
  };

  return (
    <>
      <Header />
      <Container style={{ maxWidth: "700px" }}>
        <WishlistCard
          disableButton={true}
          title={bookName}
          image={image}
          genre={genre}
          language={language}
          rentPeriod={rentPeriod}
        />
      </Container>
      <Container style={{ maxWidth: "500px" }}>
        <br />
        <br />
        <h4 style={{ color: "grey", textAlign: "center" }}>Enter details</h4>
        <div>
          <PurchaseForm
            name={name}
            user={user}
            userId={userId}
            setJsonData={setJsonData}
            setSubmitButton={setSubmitButton}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            size="medium"
            href="#payment"
            disabled={!submitButton}
          >
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
                <Form.Control
                  type="number"
                  value={cardNo}
                  placeholder="Enter your Card no."
                  onChange={(e) => setCardNo(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  value={cardName}
                  placeholder="Enter your fullname"
                  onChange={(e) => setCardName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CVV code :</Form.Label>
                <Form.Control
                  type="number"
                  value={Cvv}
                  placeholder="Enter your CVV code"
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount :</Form.Label>
                <Form.Control value={rentAmount} type="number" disabled />
              </Form.Group>
              <span style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="grey"
                  onClick={() => {
                    setCardName("");
                    setCardNo(null);
                    setCvv(null);
                  }}
                >
                  <Trash3Fill />
                </Button>
              </span>
            </div>
          ) : alignment === "right" ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>UPI id</Form.Label>
                <Form.Control
                  type="text"
                  value={upi}
                  placeholder="Enter your UPI id"
                  onChange={(e) => setUpi(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount :</Form.Label>
                <Form.Control value={rentAmount} type="number" disabled />
              </Form.Group>
              <span style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="grey"
                  onClick={() => setUpi("")}
                >
                  <Trash3Fill />
                </Button>
              </span>
            </div>
          ) : (
            <p style={{ color: "grey", textAlign: "center" }}>
              Select a payment method to proceed.
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              color="success"
              disabled={!rentButton}
              onClick={addToRentlist}
            >
              Rent book
            </Button>
          </div>
          <SuccessAlert
            openAlert={openAlert}
            closeAlert={closeAlert}
            alertMessage="Payment successful"
          />
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
