import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const SearchBar = ({ filteredBooks, setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const lowercaseSearch = searchQuery.toLowerCase();

  const memoizedResults = useMemo(() => {
    if (!searchQuery) return filteredBooks;

    return filteredBooks.filter(
      (post) =>
        (post.bookName &&
          post.bookName.toLowerCase().includes(lowercaseSearch)) ||
        (post.author && post.author.toLowerCase().includes(lowercaseSearch)) ||
        (post.language &&
          post.language.toLowerCase().includes(lowercaseSearch)) ||
        (post.description &&
          post.description.toLowerCase().includes(lowercaseSearch)) ||
        (post.genre && post.genre.toLowerCase().includes(lowercaseSearch))
    );
  }, [filteredBooks, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setSearchResults(memoizedResults);
  }, [memoizedResults, setSearchResults]);

  return (
    <div>
      <Form>
        <Form.Group className="d-flex">
          <InputGroup.Text id="inputGroupPrepend">
            <Search />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Author name, language..."
            className="mr-2"
            onChange={handleSearchChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SearchBar;
