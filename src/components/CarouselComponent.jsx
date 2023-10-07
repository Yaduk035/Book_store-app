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
          <div
            style={{
              height: "550px",
            }}
          >
            <img
              src={randomBook.image}
              alt="First slide"
              style={{
                maxHeight: "400px",
                height: "60vh",
                width: "30vh",
                borderRadius: "20px",
                marginBottom: "10%",
                marginLeft: "10%",
                boxShadow: "0 20px 50px rgba(240, 200, 200, 1)",
                position: "absolute",
                bottom: "10%",
                top: "25%",
                left: "8%",
              }}
            />
          </div>
        </div>
        <Carousel.Caption
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ padding: "10%" }}>
            <h3 style={{ color: "white" }}>{randomBook.bookName}</h3>
            <p style={{ color: "white" }}>{randomBook.description}</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      {/* Add more Carousel.Items for other slides */}
    </Carousel>
  );
};

export default CarouselComponent;
