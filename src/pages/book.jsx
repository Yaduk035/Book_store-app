import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Container, Row, Col, Button, Alert, Dropdown } from "react-bootstrap";
import noImg from "../images/icons/image_not_found-2.jpg";
import ImgUpdateModal from "../components/ImgUpdateModal";
import "./css/books.css";
import {
  PencilSquare,
  CardChecklist,
  Cart3,
  CheckLg,
  JournalArrowUp,
  CurrencyRupee,
  JournalX,
} from "react-bootstrap-icons";
import ImageModal from "../components/ImageModal";
import { GridLoader } from "react-spinners";
import { Typography, Rating } from "@mui/material";
import DeleteImgModal from "../components/DeleteImgModal";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import SuccessAlert from "../components/SuccessAlertBar";
import CommentSection from "../components/CommentSection";
import EditBooksModal from "../components/editBooksModal";
import DeleteBookModal from "../components/DeleteBookModal";
import { useData } from "../context/DataContext";

const Book = () => {
  const [bookData, setBookData] = useState();
  const [id, setId] = useState("");
  const [bookName, setBookName] = useState("");
  const [image, setImage] = useState("");
  const [rentAmount, setRentAmount] = useState();
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
  const [spinner, setSpinner] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [showBookDelModal, setShowBookDelModal] = useState(false);
  const [wishlistData, setWishlistData] = useState("");
  const [rentlistData, setRentlistData] = useState("");
  const [userWishlisted, setUserWishlisted] = useState(false);
  const [userRentlisted, setUserRentlisted] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [avgRating, setAvgRating] = useState();

  const [showEditbookModal, setShowEditbookModal] = useState(false);
  const { reloadBooksPage } = useData();

  const navigate = useNavigate();
  const allowedRoles = [1993];
  const name = localStorage.getItem("name");
  const email = localStorage?.getItem("user");
  const localUser = localStorage?.getItem("role");
  const localUserId = localStorage?.getItem("userId");
  const [admin, setAdmin] = useState(localStorage.getItem("role"));
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (localUser) {
      // Split the localUser string into an array of roles
      const userRoles = localUser
        .split(",")
        .map((role) => parseInt(role.trim(), 10));

      // Use .some() to check if any of the allowedRoles exists in userRoles
      const roleExists = userRoles.some((role) => allowedRoles.includes(role));
      if (roleExists) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setAdmin(false);
    }
  }, []);

  const checkUserWishlisted = async () => {
    const wishlistArray = wishlistData;
    // console.log("wish : ", wishlistArray);
    const userIdStr = JSON.stringify(localUserId);
    // console.log(userIdStr);
    if (wishlistArray.includes(userIdStr)) {
      setUserWishlisted(true);
    } else {
      setUserWishlisted(false);
    }
  };
  const checkUserRentlisted = async () => {
    const rentlistArray = rentlistData;
    // console.log("wish : ", wishlistArray);
    const userIdStr = JSON.stringify(localUserId);
    // console.log(userIdStr);
    if (rentlistArray.includes(userIdStr)) {
      setUserRentlisted(true);
    } else {
      setUserRentlisted(false);
    }
  };

  const getBookbyId = async () => {
    try {
      setSpinner(true);
      const response = await axiosPrivate.get(`/books/${bookId}`);
      setBookData(response?.data);
      setId(response?.data?._id);
      setImage(response?.data?.image);
      setRentAmount(response?.data.rentAmount);
      setBookName(response?.data.bookName);
      setDescription(response?.data.description);
      setAuthor(response?.data.author);
      setAvailability(response?.data.availabilityStatus);
      setGenre(response?.data.genre);
      setLanguage(response?.data.language);
      setRentPeriod(response?.data.rentPeriod);
      setYear(response?.data.year);
      setIsbn(response?.data.ISBNnumber);
      setAvgRating(response?.data.avgRating);

      const wishlistedUsers = JSON.stringify(response?.data.users.wishlist);
      const rentlistedUsers = JSON.stringify(response?.data.users.rentlist);
      setWishlistData(wishlistedUsers);
      setRentlistData(rentlistedUsers);
      // console.log("WishlistData : ", wishlistData);
      // console.log("userEffectresdata", response.data);
      // checkUserWishlisted();
      setSpinner(false);
    } catch (err) {
      if (err?.response?.status === 500) {
        setErrMsg(`No book found with id ${bookId}`);
        navigate("/notfound");

        setAlertMsg(true);
        setSpinner(false);
      }
      console.error(err);
    }
  };
  useEffect(() => {
    getBookbyId();
  }, []);

  useEffect(() => {
    checkUserWishlisted();
    checkUserRentlisted();
  }, [wishlistData, rentlistData]);

  // useEffect(() => {
  //   console.log("is User wishlisted : ", userWishlisted);
  // }, [userWishlisted]);

  useEffect(() => {
    if (!showModal && imageUpdated) {
      getBookbyId();
      reloadBooksPage(true);
    }
  }, [showModal, imageUpdated]);
  /////////////////////////////////

  const updateImgModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const openDelImgModal = () => {
    setShowDelModal(true);
  };
  const openDelBookModal = () => {
    setShowBookDelModal(true);
  };
  const closeDelImgModal = () => {
    setShowDelModal(false);
  };
  const closeDelBookModal = () => {
    setShowBookDelModal(false);
  };
  const updatedImage = () => {
    setImageUpdated(true);
    reloadBooksPage(true);
  };

  const openImageModal = (imageUrl) => {
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };
  const showAlert = () => {
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
    }, [3000]);
  };

  const editBooksClick = () => {
    setShowEditbookModal(true);
  };

  const closeEditbookModal = () => {
    setShowEditbookModal(false);
    setImageUpdated(true);
    reloadBooksPage(true);
  };

  //////////////////
  const addToWishlist = async () => {
    try {
      const bookId = id;
      const userId = localUserId;
      const wishlistData = { userId };

      const response = await axiosPrivate.post(
        `books/wishlist/${bookId}`,
        wishlistData,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      showAlert();
      setSuccessAlertMessage("Book added to wishlist");
      // console.log("WishlistResponse : ", response.data);
      setUserWishlisted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFromWishlist = async () => {
    try {
      const bookId = id;
      const reqData = { userId: localUserId };
      const response = await axiosPrivate.delete(`books/wishlist/${bookId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: reqData,
        withCredentials: true,
      });
      // console.log("WishlistResponse : ", response.data);
      setSuccessAlertMessage("Book removed from wishlist");
      showAlert();

      setUserWishlisted(false);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   console.log("cmt : ", comment);
  // }, [comment]);
  return (
    <>
      <Header />
      <EditBooksModal
        showModal={showEditbookModal}
        closeModal={closeEditbookModal}
        bookData={bookData}
      />
      {!alertMsg ? (
        <Container>
          <br />
          <br />
          <br />
          <br />
          <Row xs={12} md={12} lg={12}>
            <Col>
              <div style={{ position: "relative" }}>
                {spinner ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "60vh",
                    }}
                  >
                    <GridLoader color="#36d7b7" size={25} speedMultiplier={2} />
                  </div>
                ) : (
                  <img
                    src={image || noImg}
                    alt="Uploaded"
                    style={{
                      marginLeft: "50px",
                      maxWidth: "65%",
                      width: "400px",
                      cursor: "pointer",
                      borderRadius: "15px",
                      marginTop: "10px",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 1)",
                    }}
                    onClick={openImageModal}
                  />
                )}
              </div>
            </Col>
            <Col className="custom-font-col" xxl={6} xl={6}>
              <Row>
                <Col>
                  {spinner ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "60vh",
                      }}
                    >
                      <GridLoader
                        color="#36d7b7"
                        size={25}
                        speedMultiplier={2}
                      />
                    </div>
                  ) : (
                    <div>
                      <br />
                      <div className="centered-div">
                        <h1 style={{ fontFamily: "monospace" }}>
                          {" "}
                          {bookName}{" "}
                        </h1>
                        <div>
                          by:
                          <span style={{ color: "grey" }}>
                            {" "}
                            {(" ", author)}
                          </span>
                        </div>

                        <Typography
                          component="legend"
                          style={{ color: "grey" }}
                        >
                          Rating :
                          <span style={{ color: "grey" }}> {avgRating}</span>
                        </Typography>
                        <Rating
                          name="half-rating-read"
                          defaultValue={0}
                          precision={0.1}
                          readOnly
                          value={avgRating}
                        />
                        <br />
                        <br />
                        <p>
                          Rent :<CurrencyRupee />
                          {rentAmount}
                        </p>
                        {/* <p>Author :{author}</p> */}
                        <p>Genre :{genre}</p>
                        <p>Language :{language}</p>
                        <p>Rental period :{rentPeriod}</p>
                        <p>Availability: {availability}</p>
                        <p>ISBN number: {ISBN}</p>
                        <p>Year released: {year}</p>
                        <p>Description: {description}</p>
                        <br />
                        {userWishlisted ? (
                          <Button
                            variant="outline-dark"
                            id="buttonPadding"
                            onClick={deleteFromWishlist}
                          >
                            <CheckLg size={22} id="iconPadding" />
                            Wishlisted
                          </Button>
                        ) : (
                          <Button
                            variant="outline-dark"
                            id="buttonPadding"
                            onClick={addToWishlist}
                          >
                            <CardChecklist size={22} id="iconPadding" />
                            Add to wish list
                          </Button>
                        )}
                        {/* { (availability === 'Unavailable') &&
                      
                       } */}
                        <Button
                          variant="dark"
                          onClick={() => navigate(`/books/${bookId}/payment`)}
                          disabled={
                            (availability === "Unavailable") | userRentlisted
                          }
                        >
                          <Cart3 size={20} id="iconPadding" />
                          Rent book
                        </Button>
                      </div>
                    </div>
                  )}
                  {admin && (
                    <span
                      style={{
                        position: "absolute",
                        top: "5%",
                        right: "8%",
                      }}
                    >
                      <br />
                      <br />
                      {/* <Button
                        variant="outline-danger"
                        onClick={updateImgModal}
                        // style={{
                        //   position: "absolute",
                        //   bottom: "10%",
                        //   right: "10px",
                        // }}
                      >
                        <PencilSquare size={20} id="iconPadding" />
                        Change Image
                      </Button> */}
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="outline-dark"
                          id="dropdown-basic"
                          size="sm"
                        >
                          <PencilSquare size={20} id="iconPadding" />
                          Edit
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={updateImgModal}>
                            <AddPhotoAlternateOutlined />
                            Update image
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={openDelImgModal}>
                            <DeleteOutlineOutlined />
                            Delete image
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={editBooksClick}>
                            <JournalArrowUp size={22} id="iconPadding" />
                            Edit book info
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={openDelBookModal}>
                            <JournalX size={22} id="iconPadding" />
                            Delete Book
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Container>
            <Row className="p-5">
              <CommentSection
                bookId={bookId}
                userName={email}
                isAdmin={admin}
                avgRating={avgRating}
                setAvgRating={setAvgRating}
              />
              <Col></Col>
            </Row>
          </Container>

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
          <DeleteImgModal
            showModal={showDelModal}
            closeModal={closeDelImgModal}
            id={id}
            updatedImage={updatedImage}
          />
          <DeleteBookModal
            showModal={showBookDelModal}
            closeModal={closeDelBookModal}
            id={id}
          />
          <SuccessAlert
            openAlert={openAlert}
            closeAlert={closeAlert}
            spinner={spinner}
            alertMessage={successAlertMessage}
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
