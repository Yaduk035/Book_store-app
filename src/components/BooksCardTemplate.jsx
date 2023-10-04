import {
  Button,
  Card,
  Col,
  Row,
  Dropdown,
  DropdownButton,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/BookCardCss.css";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import noImg from "../images/icons/image_not_found-2.jpg";
import { Rating } from "@mui/material";
import {
  CardChecklist,
  ThreeDotsVertical,
  CurrencyRupee,
} from "react-bootstrap-icons";
import SuccessAlert from "../components/SuccessAlertBar";

function CardTemplate(props) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const bookId = props.id;
  const localUserId = localStorage?.getItem("userId");
  const axiosPrivate = useAxiosPrivate();

  const [userWishlisted, setUserWishlisted] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");

  const navigateToBook = () => {
    navigate(`/books/${bookId}`);
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

  const addToWishlist = async () => {
    try {
      const userId = localUserId;
      setSuccessAlertMessage("Book added to wishlist");
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
      console.log("WishlistResponse : ", response.data);
      setUserWishlisted(true);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFromWishlist = async () => {
    try {
      const reqData = { userId: localUserId };
      setSuccessAlertMessage("Book removed from wishlist");
      const response = await axiosPrivate.delete(`books/wishlist/${bookId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: reqData,
        withCredentials: true,
      });
      console.log("WishlistResponse : ", response.data);
      showAlert();

      setUserWishlisted(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Col xs={12} md={6} lg={6} xl={4} xxl={4}>
      <div style={{ padding: "6px" }}>
        <Card
          onClick={navigateToBook}
          style={
            hovered
              ? {
                  transform: "scale(1.05)",
                  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.4)",
                  borderRadius: "20px",
                  border: "3px  rgba(44, 41, 41, 0.400",
                  cursor: "pointer",
                }
              : {
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                  border: "3px  rgba(44, 41, 41, 0.400",
                  borderRadius: "10px",
                  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
                }
          }
          // onClick={navigateToBook}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Container fluid>
            <Row>
              <Col
                xs={12}
                md={4}
                style={{
                  alignItems: "center",
                  // borderRight: "1px dashed grey",
                }}
                className="d-flex justify-content-center"
              >
                <Card.Img
                  style={{ maxHeight: "50vh", maxWidth: "40vh" }}
                  src={props.image ? props.image : noImg}
                />
              </Col>
              <Col xs={12} md={8}>
                <span
                  style={{
                    position: "absolute",
                    top: "30px",
                    right: "0px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from bubbling up
                  }}
                >
                  <Dropdown>
                    <DropdownButton
                      variant="outline-light"
                      id="dropdown-button-drop-start"
                      drop="start"
                      size="sm"
                      title={<ThreeDotsVertical color="dark" size={18} />}
                    >
                      <Dropdown.Item
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click event from bubbling up
                          addToWishlist();
                        }}
                      >
                        Add to wishlist
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click event from bubbling up
                          deleteFromWishlist();
                        }}
                      >
                        Remove from wish
                      </Dropdown.Item>
                    </DropdownButton>
                  </Dropdown>
                </span>
                <Card.Body style={{ padding: "8%" }}>
                  <Card.Text className="mb-2 text-muted">
                    {props.genre}
                  </Card.Text>
                  <Card.Title className="mb-2">{props.title}</Card.Title>
                  {/* <CardalignItems.Text muted className="mb-2 text-muted">
                  Rating :{props.avgRating}{" "}
                </CardalignItems.Text> */}
                  <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    precision={0.1}
                    readOnly
                    value={props.avgRating}
                  />
                  <br />

                  {/* <Card.Text className="mb-2">id :{props.id} </Card.Text> */}
                  <Card.Text className="mb-2 text-muted">
                    {props.author}{" "}
                  </Card.Text>
                  <Card.Text className="mb-2">
                    Rent <CurrencyRupee /> :{props.rentAmount}
                  </Card.Text>
                  <Card.Text className="mb-2">
                    Language :{props.language}{" "}
                  </Card.Text>
                  {/* <Card.Text className="mb-2">
                  Availability :{props.availabilityStatus}
                </Card.Text> */}
                </Card.Body>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
      <SuccessAlert
        openAlert={openAlert}
        closeAlert={closeAlert}
        alertMessage={successAlertMessage}
      />
    </Col>
  );
}

export default CardTemplate;
