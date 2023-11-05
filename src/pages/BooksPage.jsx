import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import CardTemplate from "../components/BooksCardTemplate";
import { Container, Row, Col } from "react-bootstrap";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { SyncLoader } from "react-spinners";
import { useData } from "../context/DataContext";
import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import SearchBar from "../components/SearchBar";

const BooksPage = () => {
  const [books, setBooks] = useState("");
  const [spinner, setSpinner] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortingCriteria, setSortingCriteria] = useState("dateCreated");
  const [searchResults, setSearchResults] = useState("");

  const { addBook, contBook, bookUpdated, reloadBooksPage } = useData();

  useEffect(() => {
    document.title = "Books";
  }, []);

  const bookData = async () => {
    setSpinner(true);
    try {
      const response = await axiosPrivate.get("/books");
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
    } catch (error) {
      setSpinner(false);
    }
  };
  useEffect(() => {
    if (!contBook) {
      bookData();
    }
  }, []);

  useEffect(() => {
    if (bookUpdated) {
      bookData();
      reloadBooksPage(false);
    }
  }, []);

  const filterByGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredBooks =
    selectedGenre === "All"
      ? searchResults
      : searchResults.filter((book) => book.genre === selectedGenre);

  const sortBooks = (criteria) => {
    let sortedBooks = [...contBook];
    switch (criteria) {
      case "dateCreated":
        sortedBooks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "year":
        sortedBooks.sort((a, b) => b.year - a.year);
        break;
      case "alphabetical":
        sortedBooks.sort((a, b) => {
          if (a.bookName && b.bookName) {
            return a.bookName.localeCompare(b.bookName);
          } else if (a.bookName) {
            return 1; // Place books with titles first
          } else if (b.bookName) {
            return -1; // Place books with titles first
          }
          return 0; // If both books don't have titles, no change in order
        });
        break;
      default:
        break;
    }
    addBook(sortedBooks);
    setSortingCriteria(criteria); // Set the sorting criteria state
  };
  useEffect(() => {
    setSearchResults(contBook);
  }, [contBook]);

  return (
    <>
      <Header />
      <Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* Genre Dropdown */}
        <Col>
          <h2
            style={{
              fontFamily: "monospace",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {selectedGenre} books
          </h2>
        </Col>
        <Col>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <div>
              <div style={{ maxWidth: "220px", paddingBottom: "10px" }}>
                <SearchBar
                  filteredBooks={contBook}
                  setSearchResults={setSearchResults}
                  loading={spinner}
                />
              </div>
              <div style={{ maxWidth: "220px" }}>
                <Form.Group>
                  {/* <Form.Label style={{ fontFamily: "monospace" }}>
                    Genre:
                  </Form.Label> */}

                  <Form.Select
                    aria-label="Default select example"
                    value={selectedGenre}
                    onChange={(e) => filterByGenre(e.target.value)}
                    style={{ fontFamily: "revert-layer" }}
                    disabled={spinner}
                  >
                    <option selected disabled>
                      Select a genre
                    </option>
                    <option value='All'> {spinner ? 'Loading...' : 'All' }</option>
                    <option>Music</option>
                    <option>Story & Novel</option>
                    <option>Poetry</option>
                    <option>Fiction & Fantasy</option>
                    <option>Non-fiction</option>
                    <option>Science & Technology</option>
                    <option>Dictionary & Reference</option>
                    <option>Romance</option>
                    <option>Mystery & Thriller</option>
                    <option>Biography & Memoir</option>
                    <option>Self-help</option>
                    <option>History</option>
                    <option>Horror</option>
                    <option>Comedy</option>
                    <option>Travel & Adventure</option>
                    <option>Art & Photography</option>
                    <option>Children's Books</option>
                    <option>Culture & Society</option>
                    <option>Education & Learning</option>
                    <option>Business & Finance</option>
                    <option>Health & Wellness</option>
                    <option>Cooking & Food</option>
                    <option>Nature</option>
                    <option>Sports & Recreation</option>
                    <option>Other</option>{" "}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </div>
          <br />
        </Col>
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
          ) : Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
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
            <div>
              <p>No books to display.</p>
              <br /> <br />
              <br /> <br />
              <br /> <br />
              <br /> <br />
            </div>
          )}
        </Row>
        <br /> <br />
        <br /> <br />
      </Container>
    </>
  );
};

export default BooksPage;
