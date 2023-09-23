import { useEffect, useState, useRef } from "react";
import { Button, Modal, Spinner, Alert } from "react-bootstrap";
import axios from "../api/axios";

function ImgUpdateModal(props) {
  const [show, setShow] = useState(false);
  const [updateImg, setUpdateImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const ref = useRef();

  const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(props.showModal);
  }, [props.showModal]);

  const handleClose = () => {
    setShow(false);
    props.closeModal();
    setUpdateImg("");
  };
  const imageUploaded = () => {
    props.updatedImage();
  };

  function conBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setUpdateImg(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error :", error);
    };
  }

  const imageSubmit = async () => {
    setLoading(true);
    try {
      const imgData = { image: updateImg };
      const response = await axios.put(`/books/${props.id}`, imgData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      console.log(response.data);
      setLoading(false);
      setShowAlert(true);
      setTimeout(() => {
        handleClose();
        setShowAlert(false);
        imageUploaded();
      }, [2000]);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const handleClick = (e) => {
    ref.current.click();
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
          <Modal.Title>Update image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {updateImg ? (
              <img
                src={updateImg}
                alt=""
                style={{
                  maxWidth: "450px",
                  maxHeight: "500px",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <p>No image selected</p>
            )}
          </div>
          {showAlert && <Alert>Image updated!!</Alert>}
          <input
            ref={ref}
            type="file"
            accept=".jpg,.jpeg,.png"
            style={{ display: "none" }}
            onChange={conBase64}
          />
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button variant="dark" onClick={handleClick}>
            Browse Image
          </Button>

          {/* <Button variant="secondary" onClick={handleClose} className="ms-auto">
            Close
          </Button> */}

          <Button variant="danger" onClick={imageSubmit} disabled={!updateImg}>
            {loading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {loading ? (
              <span style={{ paddingLeft: "5px" }}>Updating Image...</span>
            ) : (
              <span style={{ paddingLeft: "5px" }}>Update Image</span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImgUpdateModal;
