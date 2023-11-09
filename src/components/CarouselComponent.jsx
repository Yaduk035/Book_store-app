import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import "./css/carouselCss.css";
import MuiButton from "../components/MuiButton";
import zIndex from "@mui/material/styles/zIndex";

const CarouselComponent = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [randomBook, setRandomBook] = useState("");
  const [imgHovered, setImgHovered] = useState(false);

  const getRandomBook = async () => {
    try {
      const response = await axiosPrivate.get("books/randombook");
      setRandomBook(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getRandomBook();
  }, []);
  return (
    <Carousel
      style={{
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.95)",
      }}
    >
      <Carousel.Item interval={3000}>
        <MuiButton />
        <Carousel.Caption>
          <h3>Latest books</h3>
          <p>Check out our latest collections.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        interval={3000}
        onClick={() => {
          navigate(`/books/${randomBook._id}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <div id="randomImgDiv">
          <div
            style={{
              height: "550px",
            }}
          >
            <img
              src={randomBook.image}
              alt="First slide"
              className={!imgHovered ? "cardImg" : "cardImgHovered"}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            />
          </div>
        </div>
        <Carousel.Caption
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div>
            <div
              style={{
                backgroundColor: "rgba(17,17,17,0.65)",
                borderRadius: "10px",
                padding: "10px",
                filter: imgHovered ? "blur(2px)" : "blur(0px)",
                transition: "all 1s",
              }}
              className="description-container"
            >
              <h3 style={{ color: "white" }}>{randomBook.bookName}</h3>
              <p style={{ color: "white", margin: "0" }}>
                {randomBook.description}
              </p>
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Add more Carousel.Items for other slides */}
    </Carousel>
  );
};

export default CarouselComponent;
