import { useEffect, useState } from "react";
import { Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PlusLg } from "react-bootstrap-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { Trash3Fill } from "react-bootstrap-icons";

function AddBooksModal(props) {
  const [show, setShow] = useState(false);
  const [bookName, setBookName] = useState("");
  const [rentAmount, setRentAmount] = useState("");
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
  const [ErrorMsg, setErrorMsg] = useState("");
  const [spinner, setSpinner] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    setShow(props.showModal);
  }, [props.showModal]);

  const handleClose = () => {
    setShow(false);
    setErrorMsg("");
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
  }, [rentPeriodInt, rentString]);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      setSpinner(true);
      const bookData = {
        bookName: bookName,
        rentAmount: rentAmount,
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
      const response = await axiosPrivate.post("/books", jsonData);
      const bookId = response?.data._id;
      setShowAlert(true);
      setSpinner(false);
      setTimeout(() => {
        handleClose();
        setShowAlert(false);
        navigate(`/books/${bookId}`);
      }, [1000]);
    } catch (error) {
      if (!error?.response) {
        setErrorMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrorMsg("Some input fields are left unfilled");
      } else {
        setErrorMsg("Something went wrong");
      }
    }
    setSpinner(false);
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
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Row>
              <Col>
                <Form.Group className="p-2">
                  <Form.Label>Book name :</Form.Label>
                  <Form.Control
                    type="text"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group className="p-2">
                  <Form.Label>Rent amount (INR) :</Form.Label>
                  <Form.Control
                    type="number"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
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
          </Form>
          <p
            style={{
              fontFamily: "monospace",
              color: "gray",
              fontSize: "0.9rem",
              borderTop: "2px dashed grey",
              borderBottom: "2px dashed grey",
              marginBottom: "0px",
            }}
          >
            Images can be added after creating the book. Go to the newly created
            bookpage, Click on the Edit button and click on update image.
          </p>
        </Modal.Body>
        {showAlert && (
          <Alert>
            {" "}
            <span style={{ justifyContent: "center", display: "flex" }}>
              {" "}
              Book added!
            </span>
          </Alert>
        )}
        {ErrorMsg && (
          <Alert variant="danger">
            {" "}
            <span style={{ justifyContent: "center", display: "flex" }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.9rem" }}>
                {ErrorMsg}
              </span>
            </span>
          </Alert>
        )}
        <Modal.Footer>
          <Button
            size="sm"
            variant="outline-danger"
            color="grey"
            onClick={() => {
              setAuthor("");
              setAvailiability("");
              setBookName("");
              setDescription("");
              setGenre("");
              setIsbnNumber(null);
              setLanguage("");
              setRentAmount(null);
              setYear(null);
              setErrorMsg("");
            }}
          >
            <Trash3Fill />
          </Button>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="outline-dark"
            id="buttonPadding"
            onClick={handleBookSubmit}
            disabled={spinner}
          >
            {spinner ? (
              <Spinner
                animation="grow"
                size="sm"
                style={{ marginRight: "5px" }}
              />
            ) : (
              <PlusLg
                size={20}
                style={{ marginRight: "5px", marginBottom: "3px" }}
              />
            )}
            Add book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddBooksModal;
