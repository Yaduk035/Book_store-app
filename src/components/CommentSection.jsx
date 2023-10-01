import React, { useEffect, useState } from "react";
import InputMultiline from "../components/CommentInput";
import CommentCard from "./CommentCard";
import { Container } from "@mui/material";
import axios from "../api/axios";

const CommentSection = (props) => {
  const [comment, setComment] = useState("");
  const [responseData, setResponseData] = useState("");
  const [reload, setReload] = useState();
  const [avgRating, setAvgRating] = useState();

  const [commentUser, setCommentUser] = React.useState();
  // React.useEffect(() => {
  //   console.log("User commented : ", commentUser);
  // }, [commentUser]);

  const getReviews = async () => {
    try {
      const id = props.bookId;
      const response = await axios.get(`books/reviews/${id}`);
      setResponseData(response.data.reviews);
      //   console.log("response data:", response.data.reviews);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getReviews();
  }, []);

  function calculateAverageRating(responseData) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < responseData.length; i++) {
      const response = responseData[i];

      if (response.hasOwnProperty("rating")) {
        const rating = parseFloat(response.rating);

        if (!isNaN(rating)) {
          sum += rating;
          count++;
        }
      }
    }
    if (count === 0) {
      return 0;
    }
    const averageRating = sum / count;
    setAvgRating(averageRating);
  }
  useEffect(() => {
    const averageRating = calculateAverageRating(responseData);
    console.log("Average Rating:", avgRating);

    const updateRating = async () => {
      try {
        const newRating = { avgRating: avgRating };
        const response = await axios.put(`books/${props.bookId}`, newRating);
        console.log(response.data);
        props.setAvgRating(avgRating);
      } catch (error) {
        console.error(error);
      }
    };

    if (avgRating !== props.avgRating) {
      updateRating();
    }
  }, [responseData]);

  // useEffect(() => {
  //   // const clgData = (responseData);
  //   console.log(responseData);
  // }, [responseData]);

  useEffect(() => {
    setReload(false);
    getReviews();
  }, [reload]);

  const handleCommentInput = (text) => {
    setComment(text);
  };

  return (
    <>
      <InputMultiline
        onTextChange={handleCommentInput}
        userName={props.userName}
        bookId={props.bookId}
        userCommented={commentUser}
        setReload={setReload}
        reload={reload}
      />
      {Array.isArray(responseData) && responseData.length > 0 ? (
        responseData.map((comments) => (
          <CommentCard
            key={comments._id}
            commentId={comments._id}
            userId={comments.userId}
            createdAt={comments.createdAt}
            rating={comments.rating}
            commentTitle={comments.commentTitle}
            comment={comments.comment}
            setCommentUser={setCommentUser}
            currentUser={props.userName}
            bookId={props.bookId}
            isAdmin={props.isAdmin}
            setReload={setReload}
          />
        ))
      ) : (
        <p>No reviews</p>
      )}
      <div
        style={{ borderBottom: "3px dashed grey", paddingTop: "20px" }}
      ></div>
    </>
  );
};

export default CommentSection;
