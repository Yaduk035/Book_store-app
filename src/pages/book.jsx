import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { Container, Row, Col } from "react-bootstrap";

const Book = () => {
  const [id, setId] = useState("");
  const [bookName, setBookName] = useState("");
  const [imageName, setImageName] = useState("");
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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [resFileName, setResFileName] = useState("");
  const [resImage, setResImage] = useState();
  const { bookId } = useParams();

  useEffect(() => {
    const getBookbyId = async () => {
      try {
        const response = await axios.get(`/books/${bookId}`);
        console.log(response.data);
        setId(response?.data?._id);
        setBookName(response?.data.bookName);
        setImageName(response?.data.imageName);
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
        }
        console.error(err);
      }
    };
    getBookbyId();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(`/getimg/${imageName}`, {
          responseType: "blob", // Specify the response type as blob
        });
        console.log("imagename :", imageName);

        if (response.status === 200) {
          // Create a URL for the blob and set it as the image source
          const objectURL = URL.createObjectURL(response.data);
          console.log("success!");
          setResImage(objectURL);
        } else {
          console.error("Image fetch failed.");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    getImage();
  }, [imageName]);

  const imageSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("File uploaded successfully");
        const name = await response?.data?.imageName;
        console.log(name);
        setResFileName(name);
        const handleImageName = async () => {
          try {
            const filename = { imageName: resFileName };
            console.log("resFileName :", resFileName);
            const response = await axios.put(`books/${id}`, filename, {
              headers: {
                "Content-Type": "application/json",
                withCredentials: true,
              },
            });
            console.log("imageNameRes :", response?.data);
          } catch (error) {
            console.error("imageNameError:", error);
          }
        };
        handleImageName();
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const ref = useRef();

  const handleClick = (e) => {
    ref.current.click();
  };
  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col style={{ borderRight: "2px solid black" }}>
            <img src={resImage} alt="Uploaded" style={{ maxWidth: "60%" }} />
            <button onClick={handleClick}>Edit Image</button>
            <input
              ref={ref}
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            {file && <button onClick={imageSubmit}>Change Image</button>}
          </Col>
          <Col>
            <br />
            <br />
            <h4> {bookName} </h4>
            <p>Author :{author}</p>
            <p>Genre :{genre}</p>
            <p>Language :{language}</p>
            <p>Rental period :{rentPeriod}</p>
            <p>Availability: {availability}</p>
            <p>ISBN number: {ISBN}</p>
            <p>Year released: {year}</p>
            <p>Description: {description}</p>
          </Col>
        </Row>
      </Container>
      {/* <div>
        <p>Book name: {bookName} </p>
        <p>Book Id:{bookId}</p>
        {errMsg && <p>Error: {errMsg} </p>}
      </div> */}
    </>
  );
};

export default Book;
