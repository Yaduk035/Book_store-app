import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import CardTemplate from "../components/BooksCardTemplate";
import { Container, Row } from "react-bootstrap";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SyncLoader } from "react-spinners";
import { useData } from "../context/DataContext";

const BooksPage = () => {
  const [books, setBooks] = useState("");
  const [spinner, setSpinner] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const { addBook, contBook } = useData();

  const bookData = async () => {
    setSpinner(true);
    try {
      const response = await axiosPrivate.get("/books");
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
      addBook(formattedData);
      setSpinner(false);
      console.log(books);
    } catch (error) {
      console.error(error);
      setSpinner(false);
    }
  };
  useEffect(() => {
    if (!contBook) {
      bookData();
    }
  }, []);

  useEffect(() => {
    console.log("dataFromContext : ", contBook);
  }, [books, contBook]);

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
          ) : Array.isArray(contBook) && contBook.length > 0 ? (
            contBook.map((book) => (
              <CardTemplate
                key={book._id}
                id={book._id}
                rentAmount={book.rentAmount}
                avgRating={book.avgRating}
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
          ) : Array.isArray(books) && books.length > 0 ? (
            books.map((book) => (
              <CardTemplate
                key={book._id}
                id={book._id}
                rentAmount={book.rentAmount}
                avgRating={book.avgRating}
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
