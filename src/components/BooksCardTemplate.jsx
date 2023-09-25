import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/BookCardCss.css";
import axios from "../api/axios";
import noImg from "../images/icons/image_not_found-2.jpg";
import { Rating } from "@mui/material";

function CardTemplate(props) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const bookId = props.id;

  const [rating, setRating] = useState(4);

  const navigateToBook = () => {
    navigate(`/books/${bookId}`);
  };
  return (
    <Col xs={12} md={6} lg={6} xl={6} xxl={4}>
      <div style={{ padding: "10px" }}>
        <Card
          onClick={navigateToBook}
          style={
            hovered
              ? {
                  transform: "scale(1.05)",
                  boxShadow: "0 5px 20px rgba(0, 0, 0, 0.4)",
                  borderRadius: "20px",
                  border: "3px dashed rgba(44, 41, 41, 0.400",
                  cursor: "pointer",
                }
              : {
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                  border: "3px dashed rgba(44, 41, 41, 0.400",
                  borderRadius: "10px",
                }
          }
          // onClick={navigateToBook}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Row xl={6}>
            <Col
              style={{
                minWidth: "190px",
                margin: "10px",
                minHeight: "190px",
              }}
              className="d-flex justify-content-center"
            >
              <Card.Img variant="top" src={props.image ? props.image : noImg} />
            </Col>
            <Col style={{ minWidth: "200px" }}>
              <Card.Body
                style={{ padding: "8%", backgroundColor: "aliceblue" }}
              >
                <Card.Title className="mb-2">{props.title}</Card.Title>
                <Rating
                  name="half-rating-read"
                  defaultValue={rating}
                  precision={0.1}
                  readOnly
                  value={rating}
                />

                <Card.Text className="mb-2">id :{props.id} </Card.Text>
                <Card.Text className="mb-2">Author :{props.author} </Card.Text>
                <Card.Text className="mb-2">Genre :{props.genre} </Card.Text>
                {/* <Card.Text className="mb-2">Language :{props.language} </Card.Text> */}
                <Card.Text className="mb-2">
                  Rental period :{props.rentPeriod}
                </Card.Text>
                <Card.Text className="mb-2">
                  Availability :{props.availabilityStatus}
                </Card.Text>
                {/* <Card.Text className="mb-2">ISBN no :{props.ISBNnumber} </Card.Text>
            <Card.Text className="mb-2">PUblished year :{props.year}</Card.Text>
            <Card.Text className="mb-2">
            Description :<br />
            {props.description}
            </Card.Text>
          <Card.Text className="mb-2">Posted at :{props.createdAt}</Card.Text> */}
                {/* <Button variant="dark" onClick={navigateToBook}>
                  Rent Book
                </Button> */}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </div>
    </Col>
  );
}

export default CardTemplate;
