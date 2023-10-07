import { useEffect, useState } from "react";
import { Button, Modal, Spinner, Alert, Row, Col } from "react-bootstrap";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FileUploader } from "react-drag-drop-files";
import {
  Trash3Fill,
  Upload,
  Crop as CropIcon,
  X,
  Save2,
  Save2Fill,
  XLg,
} from "react-bootstrap-icons";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import { Slider, Typography } from "@mui/material";

function ImgUpdateModal(props) {
  const [show, setShow] = useState(false);
  const [updateImg, setUpdateImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [file, setFile] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [switchCroppedImg, setSwitchCroppedImg] = useState(false);

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
    setCroppedImage("");
    setCroppedAreaPixels("");
    setZoom(1);
    setSwitchCroppedImg(false);
    setCropping(false);
  };
  const imageUploaded = () => {
    props.updatedImage();
  };

  // const preSubmitImage = () => {
  //   setUpdateImg(croppedImage);
  //   imageSubmit();
  // };

  const imageSubmit = async () => {
    setLoading(true);
    try {
      setUpdateImg(croppedImage);
      const imgData = { image: updateImg };
      const response = await axiosPrivate.put(`/books/${props.id}`, imgData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      setLoading(false);
      setShowAlert(true);
      setTimeout(() => {
        handleClose();
        setShowAlert(false);
        imageUploaded();
        setCroppedImage("");
        setSwitchCroppedImg(false);
        setUpdateImg("");
        setCroppedAreaPixels("");
        setZoom(1);
      }, [1000]);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleChange = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
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

  const cancelCrop = () => {
    setSwitchCroppedImg(false);
    setCroppedImage("");
    setCroppedAreaPixels("");
    setZoom(1);

    setCropping(false);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(updateImg, croppedAreaPixels);
      setSwitchCroppedImg(true);
      setCroppedImage(croppedImage);
      setUpdateImg(croppedImage);
      setCropping(false);
    } catch (e) {}
  };
  const clearImage = () => {
    setSwitchCroppedImg(false);
    setUpdateImg("");
    setCroppedImage("");
    setCropping(false);
    setCroppedAreaPixels("");

    setZoom(1);
  };

  // const onClose = () => {
  //   setCroppedImage(null);
  // };

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
                <div style={{ minHeight: "500px" }}>
                  <Cropper
                    image={updateImg}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 4.5} // Aspect ratio
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={switchCroppedImg ? croppedImage : updateImg}
                    alt=""
                    style={{
                      maxWidth: "450px",
                      maxHeight: "500px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              )
            ) : (
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
            )}
          </div>
          {showAlert && <Alert>Image updated!!</Alert>}
          {cropping && (
            <div>
              <Slider
                color="secondary"
                value={zoom}
                min={1}
                max={3}
                step={0.05}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: "space-between" }}>
          <Button
            variant="outline-dark"
            onClick={clearImage}
            // className="ms-auto"
            disabled={!updateImg}
          >
            <Trash3Fill size={20} />
          </Button>
          {updateImg && !cropping && (
            // Display the "Crop" button when an image is selected and not cropping
            <Button
              variant="outline-dark"
              onClick={handleCropImage}
              disabled={loading}
              className="ms-auto"
            >
              <CropIcon
                size={22}
                id="iconPadding"
                style={{ marginBottom: "4px" }}
              />
              Crop image
            </Button>
          )}
          {cropping && (
            // Display "Apply Crop" and "Cancel Crop" buttons when cropping
            <>
              <Button
                variant="outline-dark"
                onClick={showCroppedImage}
                disabled={loading}
                className="ms-auto"
              >
                <Save2 size={21} id="iconPadding" />
                Save
              </Button>
              <Button variant="danger" onClick={cancelCrop} disabled={loading}>
                <XLg
                  size={18}
                  style={{ marginBottom: "4px" }}
                  id="iconPadding"
                />
                Cancel
              </Button>
            </>
          )}
          {!cropping && (
            <Button
              variant="danger"
              onClick={imageSubmit}
              disabled={!updateImg || cropping}
            >
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
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImgUpdateModal;
