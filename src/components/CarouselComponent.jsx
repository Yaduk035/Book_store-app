// CarouselComponent.js

import Carousel from "react-bootstrap/Carousel";
import secondImg from "../images/carousel_imgs/vintagebooks_cropped_texted.jpg";
import firstImg from "../images/carousel_imgs/books_cropped_texted.jpg";

const CarouselComponent = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            src={firstImg}
            alt="First slide"
            style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "550px" }}
          />
          <Carousel.Caption>
            <h3>Latest books</h3>
            <p>Check out our latest collections.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={secondImg}
            alt="First slide"
            style={{ maxWidth: "100%", minWidth: "100%", maxHeight: "550px" }}
          />
          <Carousel.Caption>
            <h3>Vintage books</h3>
            <p>Explore our finest collection of vintage books.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more Carousel.Items for other slides */}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
