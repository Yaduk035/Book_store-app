import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Container, Button, Row, Col } from "react-bootstrap";
import Header from "../components/MuiHeader";
import "./css/home.css";
import CarouselComponent from "../components/CarouselComponent";
import CardTemplate from "../components/BooksCardTemplate";
import { SyncLoader } from "react-spinners";
import { useData } from "../context/DataContext";

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
  const { latestBooks, addLatestBooks } = useData();

  const [books, setBooks] = useState("");
  const [spinner, setSpinner] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    document.title = "Bookstore - Home";
  }, []);

  const bookData = async () => {
    setSpinner(true);
    try {
      const response = await axiosPrivate.get("/books/recentbooks");
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
      addLatestBooks(formattedData);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
    }
  };

  useEffect(() => {
    if (!latestBooks) {
      bookData();
    }
  }, []);

  return (
    <>
      <Header />
      <CarouselComponent />
      <div></div>
      <div id="backGnd">
        <Container>
          <div className="text-center" style={{ marginTop: "10px" }}>
            <h2
              style={{
                fontFamily: "monospace",
                margin: "20px",
                fontWeight: "bold",
              }}
            >
              New Arrivals
            </h2>
          </div>
          <Row>
            {spinner ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "20vh",
                }}
              >
                <SyncLoader color="#36d7b7" size={20} />
              </div>
            ) : Array.isArray(latestBooks) && latestBooks.length > 0 ? (
              latestBooks.map((book) => (
                <CardTemplate
                  key={book._id}
                  id={book._id}
                  avgRating={book.avgRating}
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
                  image={book.image}
                  rentAmount={book.rentAmount}
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
