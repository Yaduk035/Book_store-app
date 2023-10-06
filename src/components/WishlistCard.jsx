import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Typography, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { PermContactCalendar } from "@mui/icons-material";
import { Grid } from "@mui/material";
import DeleteConfirmModal from "./listDeleteModal";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "./SuccessAlertBar";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function WishlistCard(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [spinner, setSpinner] = React.useState(true);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  const bookId = props.bookId;
  const user = props.userId || localStorage?.getItem("userId");
  console.log("Adminpanel UserId:", user);

  const closeAlert = () => {
    setOpenAlert(false);
  };
  const showAlert = () => {
    setOpenAlert(true);
    setTimeout(() => {
      setOpenAlert(false);
      props.reload();
    }, [3000]);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const deleteFromWishlist = async () => {
    try {
      setSpinner(true);
      const reqData = { userId: user };
      const response = await axiosPrivate.delete(
        `books/${props.url}/${bookId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: reqData,
          withCredentials: true,
        }
      );
      console.log(response.data);
      setSpinner(false);
      showAlert();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setSpinner(false);
    }
  };

  return (
    <>
      <div style={{ margin: "5px" }}>
        <Card sx={{ display: "flex" }}>
          <Grid item>
            <div style={{ padding: "20px " }}>
              <img
                src={props.image}
                style={{ maxHeight: "150px", borderRadius: "10px" }}
              />
            </div>
          </Grid>
          <Grid container direction="column" justifyContent="space-between">
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {props.genre}
              </Typography>
              <Typography variant="h5" component="div">
                {props.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.language}
              </Typography>
              <Typography variant="body2">
                {props.rentPeriod}
                <br />
                {/* {'"a benevolent smile"'} */}
              </Typography>
            </CardContent>
          </Grid>
          <CardActions>
            <Stack direction="column" spacing={2}>
              {!props.disableButton && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleOpenModal}
                >
                  Delete
                </Button>
              )}
              {props.showUser && (
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => {
                    props.setModalId(bookId);
                    props.setBookTitle(props.title);
                    props.openModal();
                  }}
                  startIcon={<PermContactCalendar />}
                >
                  Show rented users
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => navigate(`/books/${bookId}`)}
              >
                See book
              </Button>
            </Stack>
          </CardActions>
        </Card>
      </div>
      <DeleteConfirmModal
        closeModal={handleCloseModal}
        showModal={openModal}
        deleteFromWishlist={deleteFromWishlist}
        modalType={props.modalType}
        rentmsgHeader={props.rentmsgHeader}
        rentMsg={props.rentMsg}
      />
      <SuccessAlert
        openAlert={openAlert}
        closeAlert={closeAlert}
        spinner={spinner}
        alertMessage="Book deleted from wishlist."
      />
    </>
  );
}
