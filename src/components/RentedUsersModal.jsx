import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "../api/axios";

function RentedUsersModal(props) {
  const [lgShow, setLgShow] = useState(false);
  const [bookId, setBookId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [rentedUsers, setRentedUsers] = useState("");

  useEffect(() => {
    setLgShow(props.openModal);
  }, [props.openModal]);

  const closeModal = () => {
    setLgShow(false);
    props.closeModal(false);
  };

  useEffect(() => {
    setBookId(props.modalId);
    setBookTitle(props.bookTitle);
  }, [props.modalId, props.bookTitle]);

  const getRentlist = async () => {
    try {
      const response = await axios.get(`books/`);

      setRentedUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        onHide={closeModal}
        backdrop="static"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Users rentlist for{" "}
            <span style={{ color: "red" }}> {bookTitle}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <p>{bookId}</p> */}

          <ListGroup as="ol" numbered>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Subheading</div>
                Cras justo odio
              </div>
              <Badge bg="primary" pill>
                14
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RentedUsersModal;
