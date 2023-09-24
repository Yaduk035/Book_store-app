import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import noImg from "../images/icons/image_not_found-2.jpg";
import ImgUpdateModal from "../components/ImgUpdateModal";
import "./css/books.css";
import { PencilSquare, CardChecklist, Cart3 } from "react-bootstrap-icons";
import ImageModal from "../components/ImageModal";

const Book = () => {
  const [id, setId] = useState("");
  const [bookName, setBookName] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [availability, setAvailability] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [rentPeriod, setRentPeriod] = useState("");
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");
  const [year, setYear] = useState("");
  const [ISBN, setIsbn] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { bookId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [imageUpdated, setImageUpdated] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allowedRoles = [1993];
  const name = localStorage.getItem("name");
  const localUser = localStorage?.getItem("role");
  const [admin, setAdmin] = useState(localStorage.getItem("role"));

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

  const getBookbyId = async () => {
    try {
      const response = await axios.get(`/books/${bookId}`);
      console.log(response.data);
      setId(response?.data?._id);
      setImage(response?.data?.image);
      setBookName(response?.data.bookName);
      setDescription(response?.data.description);
      setAuthor(response?.data.author);
      setAvailability(response?.data.availabilityStatus);
      setGenre(response?.data.genre);
      setLanguage(response?.data.language);
      setRentPeriod(response?.data.rentPeriod);
      setYear(response?.data.year);
      setIsbn(response?.data.ISBNnumber);
    } catch (err) {
      if (err?.response?.status === 500) {
        setErrMsg(`No book found with id ${bookId}`);
        setAlertMsg(true);
      }
      console.error(err);
    }
  };
  useEffect(() => {
    getBookbyId();
  }, []);

  useEffect(() => {
    if (!showModal && imageUpdated) {
      getBookbyId();
    }
  }, [showModal, imageUpdated]);

  const updateImgModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const updatedImage = () => {
    setImageUpdated(true);
  };

  const openImageModal = (imageUrl) => {
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Header />
      {!alertMsg ? (
        <Container>
          <Row xs={12} md={12} lg={12}>
            <Col style={{ borderRight: "2px solid black" }}>
              <div style={{ position: "relative" }}>
                <img
                  src={image || noImg}
                  alt="Uploaded"
                  style={{
                    maxWidth: "65%",
                    minWidth: "200px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                  onClick={openImageModal}
                />
                {admin && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10%",
                      right: "10px",
                    }}
                  >
                    <br />
                    <br />
                    <Button
                      variant="outline-danger"
                      onClick={updateImgModal}
                      // style={{
                      //   position: "absolute",
                      //   bottom: "10%",
                      //   right: "10px",
                      // }}
                    >
                      <PencilSquare size={20} id="iconPadding" />
                      Edit Image
                    </Button>
                  </div>
                )}
              </div>
            </Col>
            <Col className="custom-font-col">
              <Row>
                <Col>
                  <div className="centered-div">
                    <br />
                    <h4> {bookName} </h4>
                    <br />
                    <p>Author :{author}</p>
                    <p>Genre :{genre}</p>
                    <p>Language :{language}</p>
                    <p>Rental period :{rentPeriod}</p>
                    <p>Availability: {availability}</p>
                    <p>ISBN number: {ISBN}</p>
                    <p>Year released: {year}</p>
                    <p>Description: {description}</p>
                    <Button variant="outline-dark" id="buttonPadding">
                      <CardChecklist size={22} id="iconPadding" />
                      Add to wish list
                    </Button>
                    <Button variant="dark">
                      <Cart3 size={20} id="iconPadding" />
                      Rent book
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <ImageModal
            isOpen={isModalOpen}
            onClose={closeImageModal}
            imageUrl={image}
          />
          <ImgUpdateModal
            showModal={showModal}
            closeModal={closeModal}
            id={id}
            updatedImage={updatedImage}
          />
          {/* <div>
          <p>Book name: {bookName} </p>
          <p>Book Id:{bookId}</p>
          {errMsg && <p>Error: {errMsg} </p>}
        </div> */}
        </Container>
      ) : (
        <Alert variant="danger">No book found!</Alert>
      )}
    </>
  );
};

export default Book;
