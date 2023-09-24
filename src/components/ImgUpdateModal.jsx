import { useEffect, useState, useRef } from "react";
import { Button, Modal, Spinner, Alert, Row, Col } from "react-bootstrap";
import axios from "../api/axios";
import { FileUploader } from "react-drag-drop-files";
import { Trash3Fill, Upload } from "react-bootstrap-icons";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

function ImgUpdateModal(props) {
  const [show, setShow] = useState(false);
  const [updateImg, setUpdateImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState(null);

  const [cropping, setCropping] = useState(false); // State to track whether cropping is active
  const [crop, setCrop] = useState({ x: 0, y: 0 }); // Crop position
  const [zoom, setZoom] = useState(1); // Zoom level
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const fileTypes = ["JPG", "PNG", "GIF", "JPEG", "WEBP"];

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
  const handleChange = (file) => {
    console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setUpdateImg(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error :", error);
    };

    setFile(file);
  };

  const handleCropImage = () => {
    setCropping(true); // Activate cropping
  };

  const applyCrop = () => {
    // Apply the crop and save the cropped image
    // You can use the `crop` and `zoom` values to manipulate the image data
    setCropping(false); // Deactivate cropping
  };

  const cancelCrop = () => {
    setCropping(false); // Deactivate cropping without applying the crop
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(updateImg, croppedAreaPixels);
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setUpdateImg(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setCroppedImage(null);
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
              cropping ? (
                // Display the Cropper component when cropping is active
                <div style={{ minHeight: "500px" }}>
                  <Cropper
                    image={updateImg}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 4} // Adjust the aspect ratio as needed
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
              ) : (
                // Display the image when not cropping
                <img
                  src={updateImg}
                  alt=""
                  style={{
                    maxWidth: "450px",
                    maxHeight: "500px",
                    borderRadius: "10px",
                  }}
                />
              )
            ) : (
              // Display the file uploader if updateImg is empty
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
            )}
          </div>
          {showAlert && <Alert>Image updated!!</Alert>}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button
            variant="outline-dark"
            onClick={() => setUpdateImg("")}
            className="ms-auto"
            disabled={!updateImg}
          >
            <Trash3Fill size={20} />
          </Button>
          {updateImg && !cropping && (
            // Display the "Crop" button when an image is selected and not cropping
            <Button
              variant="primary"
              onClick={handleCropImage}
              disabled={loading}
            >
              Crop
            </Button>
          )}
          {cropping && (
            // Display "Apply Crop" and "Cancel Crop" buttons when cropping
            <>
              <Button
                variant="success"
                onClick={showCroppedImage}
                disabled={loading}
              >
                Apply Crop
              </Button>
              <Button variant="danger" onClick={cancelCrop} disabled={loading}>
                Cancel Crop
              </Button>
            </>
          )}
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
              <span style={{ paddingLeft: "5px" }}>
                <Upload
                  size={20}
                  style={{ marginRight: "7px", marginBottom: "4px" }}
                />
                Update Image
              </span>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImgUpdateModal;
