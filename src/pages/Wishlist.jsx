import React, { useEffect, useState } from "react";
import Header from "../components/MuiHeader";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import WishlistCard from "../components/WishlistCard";
import { Container } from "@mui/material";
import { SyncLoader } from "react-spinners";

const Wishlist = () => {
  const [spinner, setSpinner] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const userId = localStorage.getItem("userId");
  const [wishlistedBooks, setWishlistedBooks] = useState("");
  const [reloadList, setReloadList] = useState(false);

  useEffect(() => {
    document.title = "Wishlist";
  }, []);

  const getWishlist = async () => {
    try {
      setSpinner(true);
      const response = await axiosPrivate.get(`books/userwishlist/${userId}`);

      setWishlistedBooks(response.data);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
    }
  };
  useEffect(() => {
    setReloadList(false);
    getWishlist();
  }, []);

  const reload = () => {
    setReloadList(!reloadList);
  };

  useEffect(() => {
    getWishlist();
  }, [reloadList]);

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />

      <Container maxWidth="lg">
        <h3 style={{ textAlign: "center", padding: "20px" }}>Wish list</h3>
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
              url="wishlist"
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
              rentmsgHeader="Wishlist"
              modalType="wishlist"
            />
          ))
        ) : (
          <p>No book wishlisted</p>
        )}
        {/* // <WishlistCard /> */}
      </Container>
    </>
  );
};

export default Wishlist;
