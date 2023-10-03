import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import { Container } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { SyncLoader } from "react-spinners";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import WishlistCard from "../components/WishlistCard";
import RentedUsersModal from "../components/RentedUsersModal";
import UsersList from "../components/UsersList";
import { useData } from "../context/DataContext";

const AdminControlPanel = () => {
  const [spinner, setSpinner] = useState(false);
  const [wishlistedBooks, setWishlistedBooks] = useState("");
  const [reloadList, setReloadList] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [modalId, setModalId] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [users, setUsers] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const {
    adminRentList,
    addToAdminRentlist,
    adminPanelSortByState,
    adminSortBy,
  } = useData();

  const [sortByBooks, setSortByBooks] = useState(adminSortBy);
  adminPanelSortByState(sortByBooks);

  const controller = new AbortController();

  // useEffect(() => {
  //   console.log("Modal Id :", modalId);
  // }, [modalId]);

  const getRentlist = async () => {
    try {
      setSpinner(true);
      const response = await axios.get(`books/`);

      setWishlistedBooks(response.data);
      addToAdminRentlist(response.data);
      setSpinner(false);
    } catch (error) {
      console.error(error);
      setSpinner(false);
    }
  };

  const getUsersRentlist = async () => {
    try {
      const response = await axiosPrivate.get(`users`, {
        signal: controller.signal,
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersRentlist();
  }, []);
  // useEffect(() => {
  //   setReloadList(false);
  //   getRentlist();
  // }, []);

  useEffect(() => {
    if (!adminRentList) {
      setReloadList(false);
      getRentlist();
    }
  }, []);

  const reload = () => {
    setReloadList(!reloadList);
    getRentlist();
  };

  // useEffect(() => {
  //   getRentlist();
  // }, [reloadList]);

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
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "20px",
          }}
        >
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-dark"
              size="xl"
              id="dropdown-basic"
            >
              Sort by
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortByBooks(true)}>
                Book
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortByBooks(false)}>
                User
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>{" "}
        </div>
      </Container>
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
        ) : sortByBooks ? (
          Array.isArray(adminRentList) && adminRentList.length > 0 ? (
            adminRentList.map((book) => (
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
          )
        ) : Array.isArray(users) && users.length > 0 ? (
          users.map((user, index) => (
            <UsersList
              key={user._id}
              index={index}
              userId={user._id}
              email={user.email}
              firstname={user.firstname}
              lastname={user.lastname}
              reload={reload}
              disableRemoveButton={true}
            />
          ))
        ) : (
          <p>No users found</p>
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
