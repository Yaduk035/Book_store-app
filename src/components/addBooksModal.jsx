import { useEffect, useState } from "react";
import { Form, Row, Col, Container, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PlusLg } from "react-bootstrap-icons";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function AddBooksModal(props) {
  const [show, setShow] = useState(false);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [rentPeriodInt, setRentPeriodInt] = useState(1);
  const [rentString, setRentString] = useState("Day(s)");
  const [rentPeriod, setRentPeriod] = useState("");
  const [rentData, setRentData] = useState();
  const [availiability, setAvailiability] = useState("");
  const [ISBNnumber, setIsbnNumber] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [year, setYear] = useState();
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setShow(props.showModal);
  }, [props.showModal]);

  const handleClose = () => {
    setShow(false);
    props.closeModal();
  };

  useEffect(() => {
    setRentPeriod(`${rentPeriodInt}  ${rentString}`);
    const data = () => {
      if (rentString === `Week(s)`) {
        setRentData(rentPeriodInt * 7);
      } else if (rentString === `Month(s)`) {
        setRentData(rentPeriodInt * 30);
      } else {
        setRentData(rentPeriodInt * 1);
      }
    };
    data();
    console.log(rentData);
  }, [rentPeriodInt, rentString]);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        bookName: bookName,
        author: author,
        genre: genre,
        language: language,
        rentPeriod: rentPeriod,
        rentData: rentData,
        availabilityStatus: availiability,
        ISBNnumber: ISBNnumber,
        year: year,
        description: description,
      };
      const jsonData = JSON.stringify(bookData);
      const response = await axios.post("/books", jsonData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      const bookId = response?.data._id;
      console.log(bookId);
      setShowAlert(true);
      setTimeout(() => {
        handleClose();
        setShowAlert(false);
        navigate(`/books/${bookId}`);
      }, [2500]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        data-bs-theme="dark"
        bg="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Books</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Book name :</Form.Label>
                  <Form.Control
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Author :</Form.Label>
                  <Form.Control
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Genre :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option selected hidden>
                      Select a genre
                    </option>
                    <option>Music</option>
                    <option>Science</option>
                    <option>Dictionary</option>
                    <option>Story</option>
                    <option>Poetry</option>
                    <option>Vintage</option>
                    <option>Fantasy</option>
                    <option>Science fiction</option>
                    <option>Romance</option>
                    <option>Mystery</option>
                    <option>Biography</option>
                    <option>Memoir</option>
                    <option>Self-help</option>
                    <option>History</option>
                    <option>Horror</option>
                    <option>Comedy</option>
                    <option>Travel</option>
                    <option>Art & Photography</option>
                    <option>Children's book</option>
                    <option>Culture</option>
                    <option>Education</option>
                    <option>Others</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Language :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option selected hidden>
                      Select a Language
                    </option>
                    <option>English</option>
                    <option>Malayalam</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                    {/* <option>Spanish</option>
                    <option>French</option>
                    <option>German</option> */}
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Rental Period : {rentPeriod} </Form.Label>
                  <Row className="justify-content-start">
                    <Col>
                      <Form.Control
                        type="number"
                        value={rentPeriodInt}
                        onChange={(e) => setRentPeriodInt(e.target.value)}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Select
                        aria-label="Default select example"
                        value={rentString}
                        onChange={(e) => setRentString(e.target.value)}
                      >
                        {/* <option hidden selected>
                          Select time period
                        </option> */}
                        <option selected value={"Day(s)"}>
                          Day
                        </option>
                        <option value={"Week(s)"}>Week</option>
                        <option value={"Month(s)"}>Month</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Availability :</Form.Label>
                  <Form.Select
                    value={availiability}
                    onChange={(e) => setAvailiability(e.target.value)}
                  >
                    <option hidden selected>
                      Select status
                    </option>
                    <option>Available</option>
                    <option>Unavailable</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>ISBN number :</Form.Label>
                  <Form.Control
                    type="text"
                    value={ISBNnumber}
                    onChange={(e) => setIsbnNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Published year :</Form.Label>
                  <Form.Control
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="p-2">
              <Form.Label>Description :</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {showAlert && <Alert>Book added!</Alert>}
            {/* <Row>
              <Form.Group className="position-relative mb-3">
                <Form.Label>Image :</Form.Label>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  accept="image/*"
                />
              </Form.Group>
            </Row> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline-dark"
            id="buttonPadding"
            onClick={handleBookSubmit}
          >
            {
              <PlusLg
                size={20}
                style={{ marginRight: "5px", marginBottom: "3px" }}
              />
            }
            {"Add book"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddBooksModal;
