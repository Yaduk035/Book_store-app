import * as React from "react";
import Box from "@mui/material/Box";
import { Card, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { DropdownButton, Dropdown } from "react-bootstrap";
import AlertBar from "./SuccessAlertBar";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CommentCard(props) {
  const [isAdmin, setIdAdmin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [enableDelete, setEnableDelete] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");
  const [timeConvert, setTImeConvert] = React.useState("");
  const axiosPrivate = useAxiosPrivate();

  const showAlert = () => {
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
      props.setReload(true);
    }, [2000]);
  };

  const closeAlert = () => {
    setOpenAlert(false);
  };

  React.useEffect(() => {
    if (props.currentUser === props.userId) {
      props.setCommentUser(true);
      setCurrentUser(true);
    }
  }, [props.currentUser, props.userId]);

  React.useEffect(() => {
    if (props.isAdmin) {
      setIdAdmin(true);
    } else {
      setIdAdmin(false);
    }
  }, [props.isAdmin]);

  React.useEffect(() => {
    if (isAdmin || currentUser) {
      setEnableDelete(true);
    } else {
      setEnableDelete(false);
    }
  }, [isAdmin, currentUser]);

  React.useEffect(() => {
    const formattedDate =
      new Date(props.createdAt).toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Kolkata",
        },
        [props.createdAt]
      ) + " IST";
    setTImeConvert(formattedDate);
  }, [props.createdAt]);

  const deleteComment = async () => {
    try {
      const commentId = props.commentId;
      const bookId = props.bookId;
      const reqData = { reviewId: commentId };
      const response = await axiosPrivate.delete(`books/reviews/${bookId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: reqData,
        withCredentials: true,
      });
      setAlertMsg("Comment deleted");
      showAlert();
    } catch (error) {
      setAlertMsg("Something went wrong");
      showAlert();
    }
  };
  const card = (
    <React.Fragment>
      <CardContent style={currentUser ? { backgroundColor: "bisque" } : {}}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={props.rating}
              precision={0.5}
              readOnly
            />
          </Stack>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.userId}
        </Typography>
        <Typography variant="h5" component="div">
          {props.commentTitle}
        </Typography>
        <Typography variant="body3">{props.comment}</Typography>
        <br />
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="body2">
          {timeConvert}
        </Typography>
        {enableDelete && (
          <Dropdown>
            <DropdownButton
              variant="outline-light"
              id="dropdown-button-drop-end"
              drop="end"
              size="sm"
              title={<ThreeDotsVertical color="dark" size={18} />}
            >
              <Dropdown.Item onClick={deleteComment}>
                Delete Comment
              </Dropdown.Item>
            </DropdownButton>
          </Dropdown>
        )}
      </CardContent>
      <AlertBar
        openAlert={openAlert}
        closeAlert={closeAlert}
        alertMessage={alertMsg}
      />

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </React.Fragment>
  );

  return (
    <Col item xs={12} md={6} lg={6} xl={6} xxl={4}>
      <div style={{ padding: "10px" }}>
        <Card variant="outlined">{card}</Card>
      </div>
    </Col>
  );
}
