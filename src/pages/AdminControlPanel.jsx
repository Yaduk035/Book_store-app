import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import { Container } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { SyncLoader } from "react-spinners";
import axios from "../api/axios";
import WishlistCard from "../components/WishlistCard";
import RentedUsersModal from "../components/RentedUsersModal";

const AdminControlPanel = () => {
  const [spinner, setSpinner] = useState(false);
  const [wishlistedBooks, setWishlistedBooks] = useState("");
  const [reloadList, setReloadList] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  // useEffect(() => {
  //   console.log("Modal Id :", modalId);
  // }, [modalId]);

  const getRentlist = async () => {
    try {
      setSpinner(true);
      const response = await axios.get(`books/`);

      setWishlistedBooks(response.data);
      setSpinner(false);
    } catch (error) {
      console.error(error);
      setSpinner(false);
    }
  };
  useEffect(() => {
    setReloadList(false);
    getRentlist();
  }, []);

  const reload = () => {
    setReloadList(!reloadList);
  };

  useEffect(() => {
    getRentlist();
  }, [reloadList]);

  const openModal = () => {
    setOpenUserModal(true);
  };
  const closeModal = () => {
    setOpenUserModal(false);
    setModalId("");
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <Dropdown>
          <Dropdown.Toggle variant="outline-dark" size="xl" id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Book</Dropdown.Item>
            <Dropdown.Item href="#/action-2">User</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>{" "}
      </div>
      <Container maxWidth="lg">
        {spinner ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "20vh",
            }}
          >
            <SyncLoader color="#36d7b7" />
          </div>
        ) : Array.isArray(wishlistedBooks) && wishlistedBooks.length > 0 ? (
          wishlistedBooks.map((book) => (
            <WishlistCard
              disableButton={true}
              showUser={true}
              key={book._id}
              bookId={book._id}
              title={book.bookName}
              author={book.author}
              genre={book.genre}
              language={book.language}
              rentPeriod={book.rentPeriod}
              rentData={book.rentData}
              availabilityStatus={book.availabilityStatus}
              ISBNno={book.ArrayISBNnumber}
              year={book.year}
              description={book.description}
              updatedAt={book.updatedAt}
              createdAt={book.createdAt}
              image={book.image}
              reload={reload}
              openModal={openModal}
              setModalId={setModalId}
              setBookTitle={setBookTitle}
            />
          ))
        ) : (
          <p>No book Rented</p>
        )}
      </Container>
      <RentedUsersModal
        openModal={openUserModal}
        closeModal={closeModal}
        modalId={modalId}
        bookTitle={bookTitle}
      />
    </>
  );
};

export default AdminControlPanel;
