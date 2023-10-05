import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import CardTemplate from "../components/BooksCardTemplate";
import { Container, Row } from "react-bootstrap";
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
    if (bookUpdated) {
      bookData();
      reloadBooksPage(false);
    }
  }, []);

  useEffect(() => {
    console.log("dataFromContext : ", contBook);
  }, [books, contBook]);

  // useEffect(() => {
  //   console.log(books);
  // }, [books]);
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
        <div>
          <SearchBar
            filteredBooks={contBook}
            setSearchResults={setSearchResults}
          />
          <span>
            <h2 style={{ fontFamily: "monospace", textAlign: "center" }}>
              {selectedGenre} books
            </h2>
          </span>
          <Form.Group
            className="p-2"
            style={{
              maxWidth: "250px",
              position: "absolute",
              right: "50px",
              top: "80px",
            }}
          >
            <Form.Label style={{ fontFamily: "monospace" }}>Genre:</Form.Label>

            <Form.Select
              aria-label="Default select example"
              value={selectedGenre}
              onChange={(e) => filterByGenre(e.target.value)}
              style={{ fontFamily: "revert-layer" }}
            >
              <option selected hidden>
                Select a genre
              </option>
              <option>All</option>
              <option>Music</option>
              <option>Story & Novel</option>
              <option>Poetry</option>
              <option>Fiction & Fantasy</option>
              <option>Non-fiction</option>
              <option>Science & Technology</option>
              <option>Dictionary & Reference</option>
              <option>Fantasy & Science Fiction</option>
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
          <br />
          <br />
          {/* Filter by Genre:{" "}
          <select
            onChange={(e) => filterByGenre(e.target.value)}
            value={selectedGenre}
          >
            <option value="All">All</option>
            <option value="Story">Story</option>
            <option value="Science_Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
          </select> */}
        </div>
        {/* Sort By Button Group */}
        {/* <div>
          Sort By:{" "}
          <button onClick={() => sortBooks("dateCreated")}>Date Created</button>
          <button onClick={() => sortBooks("year")}>Year</button>
          <button onClick={() => sortBooks("alphabetical")}>
            Alphabetical
          </button>
        </div> */}
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
