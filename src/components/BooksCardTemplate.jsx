import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/BookCardCss.css";
import axios from "../api/axios";

function CardTemplate(props) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const bookId = props.id;

  const navigateToBook = () => {
    navigate(`/books/${bookId}`);
  };
  return (
    <Col xs={12} md={6} lg={6} xl={4} xxl={3}>
      <div style={{ padding: "10px" }}>
        <Card
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
                }
          }
          // onClick={navigateToBook}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body style={{ padding: "8%" }}>
            <Card.Title className="mb-2">{props.title}</Card.Title>
            <Card.Text className="mb-2">id :{props.id} </Card.Text>
            <Card.Text className="mb-2">Author :{props.author} </Card.Text>
            <Card.Text className="mb-2">Genre :{props.genre} </Card.Text>
            <Card.Text className="mb-2">Language :{props.language} </Card.Text>
            <Card.Text className="mb-2">
              Rental period :{props.rentPeriod}
            </Card.Text>
            <Card.Text className="mb-2">
              Availability :{props.availabilityStatus}
            </Card.Text>
            <Card.Text className="mb-2">ISBN no :{props.ISBNnumber} </Card.Text>
            <Card.Text className="mb-2">PUblished year :{props.year}</Card.Text>
            <Card.Text className="mb-2">
              Description :<br />
              {props.description}
            </Card.Text>
            <Card.Text className="mb-2">Posted at :{props.createdAt}</Card.Text>
            <Button variant="dark" onClick={navigateToBook}>
              Rent Book
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
}

export default CardTemplate;
