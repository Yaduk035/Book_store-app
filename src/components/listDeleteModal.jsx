import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BounceLoader } from "react-spinners";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteConfirmModal(props) {
  const [open, setOpen] = React.useState(false);
  const [deleteSpinner, setDeleteSpinner] = React.useState(true);

  React.useEffect(() => {
    setDeleteSpinner(props.spinner);
  }, [props.spinner]);

  React.useEffect(() => {
    setOpen(props.showModal);
  }, [props.showModal]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.closeModal();
  };

  const deleteBook = () => {
    props.deleteFromWishlist();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Wishlist
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Remove book from {props.modalType}?
          </Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="error"
              startIcon={
                deleteSpinner ? (
                  <BounceLoader color="#ffffff" size={15} />
                ) : (
                  <DeleteIcon />
                )
              }
              onClick={deleteBook}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
