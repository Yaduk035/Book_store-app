import React from "react";
import Modal from "react-modal";
import { XSquareFill, XSquare } from "react-bootstrap-icons";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the alpha value as needed
  },
  content: {
    background: "none",
    border: "3px dashed grey",
    borderRadius: "15px",
    top: "50%",
    bottom: "auto",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "550px",
    maxHeight: "100%", // Adjust the percentage as needed
    overflow: "auto", // Add scrollbars if necessary
    marginTop: "3vh",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "10px",
    cursor: "pointer",
  },
};

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      style={customStyles}
    >
      <div style={customStyles.closeButton}>
        <XSquare size={30} style={{ color: "white" }} onClick={onClose} />
        {/* <button onClick={onClose}>Close</button> */}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img
          src={imageUrl}
          alt="Image"
          style={{
            maxHeight: "80vh",
            maxWidth: "80vh",
            minWidth: "40vh",
            minHeight: "50vh",
            height: "auto",
            width: "auto",
            borderRadius: "15px",
          }}
        />
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </Modal>
  );
};

export default ImageModal;
