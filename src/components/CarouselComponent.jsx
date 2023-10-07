import Carousel from "react-bootstrap/Carousel";
import firstImg from "../images/carousel_imgs/books_cropped_texted.jpg";
import backGndImg from "../images/carousel_imgs/vintagebooks_cropped.jpg";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import "./css/carouselCss.css";
import MuiButton from "../components/MuiButton";

const CarouselComponent = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [randomBook, setRandomBook] = useState("");

  const getRandomBook = async () => {
    try {
      const response = await axiosPrivate.get("books/randombook");
      setRandomBook(response.data);
      console.log(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getRandomBook();
  }, []);
  return (
    <Carousel>
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
          <img
            src={randomBook.image}
            alt="First slide"
            style={{
              height: "550px",
              width: "60vh",
              borderRadius: "20px",
              boxShadow: "0 20px 50px rgba(240, 200, 200, 0.7)",
            }}
          />
        </div>
        <Carousel.Caption>
          <h3 style={{ color: "black" }}>{randomBook.bookName}</h3>
          <p style={{ color: "black" }}>{randomBook.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Add more Carousel.Items for other slides */}
    </Carousel>
  );
};

export default CarouselComponent;
