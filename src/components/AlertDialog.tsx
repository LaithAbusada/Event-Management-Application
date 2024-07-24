import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { deleteById } from "@/lib/firebase/firestore";
import { AlertProps } from "@/interfaces/interfaces";
import { TOAST_TYPES } from "@/constants/toastEnums";
import { showToast } from "@/helpers/toast";

export default function AlertDialog(props: AlertProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAgree() {
    try {
      setOpen(false);
      await deleteById(props.id);
      // force page refresh as there is no listener to change the events now, so refresh the page to show the event was successfully deleted
      window.location.reload();
      showToast(TOAST_TYPES.SUCCESS, "Event Deleted Successfully! ");
    } catch (e) {
      showToast(
        TOAST_TYPES.ERROR,
        "There was an error deleting your event, please try again later"
      );
    }
  }

  return (
    <React.Fragment>
      <Tooltip title="Delete">
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon className="text-red-500" fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this event?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to delete
            this event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} style={{ color: "red" }}>
            Delete
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
