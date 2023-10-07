import * as React from "react";
import { useState } from "react";
import { Input } from "@mui/base/Input";
import { styled } from "@mui/system";
import { Button, Stack } from "@mui/material";
// import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import HoverRating from "./RatingHover";
import { common } from "@mui/material/colors";
import AlertBar from "./SuccessAlertBar";

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <Input
      slots={{ input: StyledInputElement, textarea: StyledTextareaElement }}
      {...props}
      ref={ref}
    />
  );
});

export default function InputMultiline({
  onTextChange,
  bookId,
  userName,
  userCommented,
  setReload,
  reload,
}) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState();
  const [title, setTitle] = useState("");
  const [reviewAdded, setReviewAdded] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const [isuserCommented, setIsUserCommented] = React.useState();
  // React.useEffect(() => {
  //   if (props.userId === props.currentUser) {
  //     setCommentUser(true);
  //   } else {
  //     setCommentUser(false);
  //   }
  // }, [props.userName]);

  React.useEffect(() => {
    if (userCommented) {
      setIsUserCommented(true);
    } else {
      setIsUserCommented(false);
    }
  }, [userCommented, reload]);

  React.useEffect(() => {
    if (rating && title && text) {
      setReviewAdded(true);
    } else {
      setReviewAdded(false);
    }
  }, [rating, title, text]);

  const handleInputChange = (e) => {
    setText(e.target.value);
    onTextChange(e.target.value);
  };

  const showAlert = () => {
    setOpenAlert(true);
    setTimeout(() => {
      setReload(true);
      setOpenAlert(false);
    }, [2000]);
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  const onCommentSubmit = async () => {
    try {
      const data = {
        userId: userName,
        rating: rating,
        comment: text,
        commentTitle: title,
      };
      const response = await axiosPrivate.post(`books/reviews/${bookId}`, data);
      setAlertMsg("Comment added");
      showAlert();
      setRating(null);
      setTitle("");
      setText("");
    } catch (error) {
      setAlertMsg("Something went wrong.");
      showAlert();
    }
  };

  return (
    <>
      {/* {!isuserCommented && ( */}
      <div
        style={{
          borderTop: "3px dashed grey",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.4)",

              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h4>Add a review</h4>
            <HoverRating setRating={setRating} />
            <CustomInput
              aria-label="Demo input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <CustomInput
              aria-label="Demo input"
              multiline
              placeholder="Type your comment here"
              value={text}
              onChange={handleInputChange}
            />
            <div>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setText("");
                    setTitle("");
                    setOpenAlert(true);
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={onCommentSubmit}
                  disabled={!reviewAdded || isuserCommented}
                  // disabled={isuserCommented && reviewAdded}
                >
                  Add comment
                </Button>
              </Stack>
              <AlertBar
                openAlert={openAlert}
                closeAlert={closeAlert}
                alertMessage={alertMsg}
              />
              {/* <br /> <br /> */}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledTextareaElement = styled("textarea", {
  shouldForwardProp: (prop) =>
    !["ownerState", "minRows", "maxRows"].includes(prop.toString()),
})(
  ({ theme }) => `
  width: 320px;
  height: 80px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[500] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
