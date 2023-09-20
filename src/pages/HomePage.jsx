import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Container, Button, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import "./css/home.css";
import CarouselComponent from "../components/CarouselComponent";
import CardTemplate from "../components/BooksCardTemplate";

const HomePage = () => {
  // const [userTier, setUserTier] = useState(false);
  // const allowedRoles = [1993];
  // const localUser = localStorage.getItem("role");
  // // Split the localUser string into an array of roles
  // const userRoles = localUser
  //   .split(",")
  //   .map((role) => parseInt(role.trim(), 10));

  // // Use .some() to check if any of the allowedRoles exists in userRoles
  // const roleExists = userRoles.some((role) => allowedRoles.includes(role));

  const [books, setBooks] = useState("");

  useEffect(() => {
    const bookData = async () => {
      try {
        const response = await axios.get("/books/recentbooks");
        console.log("Data :", response.data);
        const formattedData = response.data.map((book) => {
          const createdAt =
            new Date(book.createdAt).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            }) + " IST";
          const updatedAt =
            new Date(book.updateAt).toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            }) + " IST";
          return {
            ...book,
            createdAt,
            updatedAt,
          };
        });
        setBooks(formattedData);
      } catch (error) {
        console.error(error);
      }
    };
    bookData();
  }, []);
  useEffect(() => {
    console.log(books);
  }, [books]);

  return (
    <>
      <Header />
      <div id="backGnd">
        <Row>
          <div>
            <CarouselComponent />
          </div>
        </Row>
        <Container>
          <Row>
            {Array.isArray(books) && books.length > 0 ? (
              books.map((book) => (
                <CardTemplate
                  key={book._id}
                  id={book._id}
                  title={book.bookName}
                  author={book.author}
                  genre={book.genre}
                  language={book.language}
                  rentPeriod={book.rentPeriod}
                  rentData={book.rentData}
                  availabilityStatus={book.availablityStatus}
                  ISBNno={book.ArrayISBNnumber}
                  year={book.year}
                  description={book.description}
                  updatedAt={book.updatedAt}
                  createdAt={book.createdAt}
                />
              ))
            ) : (
              <p>No books to display.</p>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
