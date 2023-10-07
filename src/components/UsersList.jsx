import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import SuccessAlert from "./SuccessAlertBar";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import EditUser_admin from "./EditUser_admin";

const UsersList = (props) => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleClose = () => {
    props.reload();
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const delFromRentlist = async () => {
    try {
      const reqData = { userId: props.userId };
      const response = await axiosPrivate.delete(
        `books/rentlist/${props.bookId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: reqData,
          withCredentials: true,
        }
      );
    } catch (error) {}
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };
  const showAlert = () => {
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
      props.reload();
    }, [3000]);
  };

  const closeModal = () => {
    setShowModal(false);
    props.getUsersRentlist();
  };

  return (
    <>
      <ListGroup as="ol">
        <ListGroup.Item
          as="li"
          key={props.key}
          className="d-flex justify-content-between align-items-start"
        >
          <Badge bg="dark" pill>
            0{props.index + 1}
          </Badge>
          <div className="ms-2 me-auto">
            <div className="fw-bold">{props.email}</div>
            Full name : {props.firstname} {props.lastname}
            <br />
            Id : {props.userId}
          </div>
          <Stack direction="column" spacing={2}>
            {!props.disableRemoveButton ? (
              <Button variant="outlined" color="error" onClick={handleShow}>
                Remove from list
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() =>
                  navigate(
                    `/admincontrols/${props.userId}/rentlist/${props.email}`
                  )
                }
              >
                Show user rentlist
              </Button>
            )}
            {props.EnableEditUserButton && (
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => setShowModal(true)}
              >
                Edit / Delete user
              </Button>
            )}
          </Stack>
        </ListGroup.Item>
      </ListGroup>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Remove user <span style={{ color: "red" }}> {props.email} </span>
          from rent list?
        </Modal.Body>
        <Modal.Footer>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                delFromRentlist();
                showAlert();
                setTimeout(() => {
                  handleClose();
                }, [2000]);
              }}
            >
              Remove
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
      <SuccessAlert
        openAlert={openAlert}
        closeAlert={closeAlert}
        alertMessage="User deleted from list."
      />
      <EditUser_admin
        showModal={showModal}
        closeModal={closeModal}
        userId={props.userId}
        firstname={props.firstname}
        lastname={props.lastname}
        email={props.email}
        reload={props.reload}
      />
    </>
  );
};

export default UsersList;
