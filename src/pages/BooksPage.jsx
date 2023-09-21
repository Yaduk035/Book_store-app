import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CardTemplate from "../components/BooksCardTemplate";
import { Container, Row } from "react-bootstrap";
import axios from "../api/axios";

const BooksPage = () => {
  const [books, setBooks] = useState("");

  useEffect(() => {
    const bookData = async () => {
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
      <Container>
        <br />
        <br />
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
        <br /> <br />
      </Container>
    </>
  );
};

export default BooksPage;
