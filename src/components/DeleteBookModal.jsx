import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";

function DeleteBookModal(props) {
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    setShow(props.showModal);
  }, [props.showModal]);

  const handleClose = () => {
    props.closeModal();
  };
  const handleShow = () => setShow(true);

  const deleteBook = async () => {
    try {
      const response = await axiosPrivate.delete(`/books/${props.id}`);
      navigate(-1);
      handleClose();
    } catch (error) {}
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Book?</Modal.Title>
        </Modal.Header>

        {/* <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteBook}>
            Delete Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBookModal;
