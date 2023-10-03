import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UsersList from "./UsersList";
import { PropagateLoader, RotateLoader } from "react-spinners";

import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

function RentedUsersModal(props) {
  const [lgShow, setLgShow] = useState(false);
  const [bookTitle, setBookTitle] = useState("");
  const [rentedUsers, setRentedUsers] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setLgShow(props.openModal);
    if (props.openModal && props.modalId) {
      getRentlist();
    }
  }, [props.openModal, props.modalId]);

  const closeModal = () => {
    setLgShow(false);
    props.closeModal();
    setRentedUsers("");
  };

  useEffect(() => {
    setBookTitle(props.bookTitle);
  }, [props.modalId, props.bookTitle]);

  useEffect(() => {
    console.log("resDtat :", rentedUsers);
  }, [rentedUsers]);

  const getRentlist = async () => {
    try {
      setSpinner(true);
      const response = await axiosPrivate.get(
        `books/bookrentlist/${props.modalId}`
      );
      setRentedUsers(response.data);
      setSpinner(false);
    } catch (error) {
      console.error(error);
      setSpinner(false);
    }
  };

  const reload = () => {
    setReloadList(!reloadList);
  };

  useEffect(() => {
    getRentlist();
  }, [reloadList]);

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
            <span style={{ color: "red" }}> {bookTitle} </span>
            <span style={{ fontSize: "0.9rem", color: "grey" }}>
              (Book id: {props.modalId})
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <p>{bookId}</p> */}
          {spinner && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PropagateLoader
                color="#36d7b7"
                speedMultiplier={2}
                style={{ padding: "30px" }}
              />
            </div>
          )}
          {Array.isArray(rentedUsers) && rentedUsers.length > 0 ? (
            rentedUsers.map((user, index) => (
              <UsersList
                key={user._id}
                index={index}
                userId={user._id}
                email={user.email}
                firstname={user.firstname}
                lastname={user.lastname}
                bookId={props.modalId}
                reload={reload}
              />
            ))
          ) : (
            <span>{!spinner && <p>no users</p>}</span>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RentedUsersModal;
