import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Dropdown,
  Collapse,
  Spinner,
} from "react-bootstrap";
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
  ChevronDown,
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
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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
  const [avgRating, setAvgRating] = useState(1);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [wishlistspinner, setWishlistSpinner] = useState(false);

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
    document.title = bookName || "Books";
  }, [bookName]);

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
    const userIdStr = JSON.stringify(localUserId);
    if (wishlistArray.includes(userIdStr)) {
      setUserWishlisted(true);
    } else {
      setUserWishlisted(false);
    }
  };
  const checkUserRentlisted = async () => {
    const rentlistArray = rentlistData;
    const userIdStr = JSON.stringify(localUserId);
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
      // checkUserWishlisted();
      setSpinner(false);
    } catch (err) {
      if (err?.response?.status === 500) {
        setErrMsg(`No book found with id ${bookId}`);
        navigate("/notfound");

        setAlertMsg(true);
        setSpinner(false);
      }
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
  //   setAvgRating(3);
  // }, [bookData]);

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
      setWishlistSpinner(true);
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
      setUserWishlisted(true);
      setWishlistSpinner(false);
    } catch (error) {
      setSuccessAlertMessage("Something went wrong");
      showAlert();
      setWishlistSpinner(false);
    }
  };

  const deleteFromWishlist = async () => {
    try {
      setWishlistSpinner(true);

      const bookId = id;
      const reqData = { userId: localUserId };
      const response = await axiosPrivate.delete(`books/wishlist/${bookId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: reqData,
        withCredentials: true,
      });
      setSuccessAlertMessage("Book removed from wishlist");
      showAlert();
      setUserWishlisted(false);
      setWishlistSpinner(false);
    } catch (error) {
      setSuccessAlertMessage("Something went wrong");
      showAlert();
      setWishlistSpinner(false);
    }
  };
  ////////////////////////////////////////////////
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: 14,
    },
  }));
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
                {admin && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "1%",
                      right: "0%",
                    }}
                  >
                    <br />
                    <br />
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="outline-dark"
                        id="dropdown-basic"
                      >
                        <PencilSquare size={20} id="iconPadding" />
                        Edit
                        <br />
                        (Admin only)
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
                        <p
                          style={{
                            fontFamily: "monospace",
                            fontStyle: "italic",
                            color: "grey",
                          }}
                        >
                          {genre}
                        </p>
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
                          defaultValue={avgRating}
                          precision={0.1}
                          readOnly
                          value={avgRating}
                        />
                        <p>
                          <span
                            style={{
                              fontSize: "1.1rem",
                              color: "gray",
                              fontWeight: "bold",
                            }}
                          >
                            Rent :
                            <CurrencyRupee />
                            {rentAmount}.00
                          </span>
                        </p>
                        <span style={{ fontFamily: "monospace" }}>
                          <p style={{ fontFamily: "monospace" }}>
                            Genre :{genre}
                          </p>
                          <p style={{ fontFamily: "monospace" }}>
                            Language :{language}
                          </p>
                          <p style={{ fontFamily: "monospace" }}>
                            Rental period :{rentPeriod}
                          </p>
                          <p style={{ fontFamily: "monospace" }}>
                            Availability: {availability}
                          </p>
                          <p style={{ fontFamily: "monospace" }}>
                            ISBN number: {ISBN}
                          </p>
                          <p style={{ fontFamily: "monospace" }}>
                            Year released: {year}
                          </p>
                          <p
                            onClick={() => setOpenCollapse(!openCollapse)}
                            aria-controls="example-collapse-text"
                            aria-expanded={openCollapse}
                            style={{
                              cursor: "pointer",
                              fontFamily: "monospace",
                              color: "GrayText",
                            }}
                          >
                            Description:
                            <ChevronDown size={20} />
                          </p>
                          <Collapse in={openCollapse}>
                            <div id="example-collapse-text">{description}</div>
                          </Collapse>
                        </span>
                        <br />
                        {userWishlisted ? (
                          <Button
                            variant="outline-dark"
                            id="buttonPadding"
                            onClick={deleteFromWishlist}
                            disabled={wishlistspinner}
                          >
                            {!wishlistspinner ? (
                              <CheckLg size={22} id="iconPadding" />
                            ) : (
                              <Spinner animation="grow" size="sm" />
                            )}
                            Wishlisted
                          </Button>
                        ) : (
                          <Button
                            variant="outline-dark"
                            id="buttonPadding"
                            onClick={addToWishlist}
                            disabled={wishlistspinner}
                          >
                            {!wishlistspinner ? (
                              <CardChecklist size={22} id="iconPadding" />
                            ) : (
                              <Spinner animation="grow" size="sm" />
                            )}
                            Add to wish list
                          </Button>
                        )}
                        {/* { (availability === 'Unavailable') &&
                      
                       } */}
                        {(availability === "Unavailable") | userRentlisted ? (
                          <LightTooltip
                            title={
                              userRentlisted
                                ? "Already rented"
                                : "Currently unavailable"
                            }
                            arrow
                          >
                            <span style={{ cursor: "pointer" }}>
                              <Button variant="dark" disabled>
                                <Cart3 size={20} id="iconPadding" />
                                Rent book
                              </Button>
                            </span>
                          </LightTooltip>
                        ) : (
                          <span>
                            <Button
                              variant="dark"
                              onClick={() =>
                                navigate(`/books/${bookId}/payment`)
                              }
                            >
                              <Cart3 size={20} id="iconPadding" />
                              Rent book
                            </Button>
                          </span>
                        )}
                      </div>
                    </div>
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
