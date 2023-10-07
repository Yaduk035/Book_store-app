import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const SearchBar = ({ filteredBooks, setSearchResults }) => {
  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(filteredBooks);

    const lowercaseSearch = e.target.value.toLowerCase();

    const results = filteredBooks.filter(
      (post) =>
        (post.bookName &&
          post.bookName.toLowerCase().includes(lowercaseSearch)) ||
        (post.author && post.author.toLowerCase().includes(lowercaseSearch)) ||
        (post.language &&
          post.language.toLowerCase().includes(lowercaseSearch)) ||
        (post.description &&
          post.description.toLowerCase().includes(lowercaseSearch))
    );
    setSearchResults(results);
  };

  return (
    <Container>
      <Row className="justify-content-start mt-3">
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form>
            <Form.Group className="d-flex">
              <InputGroup.Text id="inputGroupPrepend">
                {" "}
                <Search />{" "}
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Author name, language..."
                className="mr-2"
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
