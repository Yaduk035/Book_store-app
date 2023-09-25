import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import CardTemplate from "../components/BooksCardTemplate";
import { Container, Row } from "react-bootstrap";
import axios from "../api/axios";
import { SyncLoader } from "react-spinners";

const BooksPage = () => {
  const [books, setBooks] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    const bookData = async () => {
      setSpinner(true);
      try {
        const response = await axios.get("/books");
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
        setSpinner(false);
      } catch (error) {
        console.error(error);
        setSpinner(false);
      }
    };
    bookData();
  }, []);

  // useEffect(() => {
  //   console.log(books);
  // }, [books]);

  return (
    <>
      <Header />
      <Container>
        <br />
        <br />
        <Row>
          {spinner ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10vh",
              }}
            >
              <SyncLoader color="#36d7b7" />
            </div>
          ) : Array.isArray(books) && books.length > 0 ? (
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
                availabilityStatus={book.availabilityStatus}
                ISBNno={book.ArrayISBNnumber}
                year={book.year}
                description={book.description}
                updatedAt={book.updatedAt}
                createdAt={book.createdAt}
                image={book.image}
              />
            ))
          ) : (
            <p>No books to display.</p>
          )}
        </Row>
        <br /> <br />
      </Container>
    </>
  );
};

export default BooksPage;
