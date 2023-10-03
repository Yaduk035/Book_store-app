import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function DeleteImgModal(props) {
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setShow(props.showModal);
  }, [props.showModal]);

  const handleClose = () => {
    props.closeModal();
  };
  const handleShow = () => setShow(true);

  const deleteImage = async () => {
    try {
      const imgData = { image: "" };
      await axiosPrivate.put(`/books/${props.id}`, imgData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      props.updatedImage();
      handleClose();
      // console.log(response.data);
    } catch (error) {
      console.error(error);
      handleClose();
    }
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
          <Modal.Title>Delete image?</Modal.Title>
        </Modal.Header>

        {/* <Modal.Body>
          I will not close if you click outside me. Don not even try to press
          escape key.
        </Modal.Body> */}
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteImage}>
            Delete image
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteImgModal;
