import React, { useEffect, useState } from "react";
import InputMultiline from "../components/CommentInput";
import CommentCard from "./CommentCard";
import { Container } from "@mui/material";
import axios from "../api/axios";

const CommentSection = (props) => {
  const [comment, setComment] = useState("");
  const [responseData, setResponseData] = useState("");

  const [commentUser, setCommentUser] = React.useState();
  React.useEffect(() => {
    console.log("User commented : ", commentUser);
  }, [commentUser]);

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
          />
        ))
      ) : (
        <p>No reviews</p>
      )}
    </>
  );
};

export default CommentSection;
