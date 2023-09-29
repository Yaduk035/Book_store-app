import * as React from "react";
import { useState } from "react";
import { Input } from "@mui/base/Input";
import { styled } from "@mui/system";
import { Button, Stack } from "@mui/material";
// import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "../api/axios";
import HoverRating from "./RatingHover";

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
}) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState("");

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
  }, [userCommented]);

  // React.useEffect(() => {
  //   console.log("rating :", rating);
  // }, [rating]);

  const handleInputChange = (e) => {
    setText(e.target.value);
    onTextChange(e.target.value);
    // console.log("Comment : ", text);
  };

  const onCommentSubmit = async () => {
    try {
      const data = {
        userId: userName,
        rating: rating,
        comment: text,
        commentTitle: title,
      };
      const response = await axios.post(`books/reviews/${bookId}`, data);
      console.log("add comment respose : ", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <HoverRating setRating={setRating} />
        <CustomInput
          aria-label="Demo input"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <CustomInput
          aria-label="Demo input"
          multiline
          placeholder="Type something…"
          value={text}
          onChange={handleInputChange}
        />
        <div>
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => setText("")}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={onCommentSubmit}
              disabled={isuserCommented}
            >
              Add comment
            </Button>
          </Stack>
          <br /> <br />
        </div>
      </div>
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
  width: 420px;
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
