import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import axios from "../api/axios";
import WishlistCard from "../components/WishlistCard";
import { Container } from "@mui/material";
import { SyncLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const AdminPanelRentlist = () => {
  const [spinner, setSpinner] = useState(false);
  const { userId } = useParams();

  const [wishlistedBooks, setWishlistedBooks] = useState("");
  const [reloadList, setReloadList] = useState(false);

  const allowedRoles = [1993];
  const localUser = localStorage?.getItem("role");
  const [admin, setAdmin] = useState(localStorage.getItem("role"));

  useEffect(() => {
    if (localUser) {
      // Split the localUser string into an array of roles
      const userRoles = localUser
        .split(",")
        .map((role) => parseInt(role.trim(), 10));

      // Use .some() to check if any of the allowedRoles exists in userRoles
      const roleExists = userRoles.some((role) => allowedRoles.includes(role));
      if (roleExists) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setAdmin(false);
    }
  }, []);

  const getRentlist = async () => {
    try {
      setSpinner(true);
      const response = await axios.get(`books/userrentlist/${userId}`);

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

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h3 style={{ textAlign: "center", padding: "20px" }}>
          Currently rented books by {userId}
        </h3>
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
              url="rentlist"
              disableButton={!admin}
              userId={userId}
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
            />
          ))
        ) : (
          <p>No book Rented</p>
        )}
      </Container>
    </>
  );
};

export default AdminPanelRentlist;
