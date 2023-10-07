import React, { useEffect, useState } from "react";
import InputMultiline from "../components/CommentInput";
import CommentCard from "./CommentCard";
import { Container } from "@mui/material";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const CommentSection = (props) => {
  const [comment, setComment] = useState("");
  const [responseData, setResponseData] = useState("");
  const [reload, setReload] = useState();
  const [avgRating, setAvgRating] = useState();

  const [commentUser, setCommentUser] = React.useState();
  const axiosPrivate = useAxiosPrivate();

  const getReviews = async () => {
    try {
      const id = props.bookId;
      const response = await axiosPrivate.get(`books/reviews/${id}`);
      setResponseData(response.data.reviews);
    } catch (error) {}
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

    const updateRating = async () => {
      try {
        const newRating = { avgRating: avgRating };
        const response = await axiosPrivate.put(
          `books/${props.bookId}`,
          newRating
        );
        props.setAvgRating(avgRating);
      } catch (error) {}
    };

    if (avgRating !== props.avgRating) {
      updateRating();
    }
  }, [responseData]);

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
