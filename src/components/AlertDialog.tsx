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
import { toast } from "react-toastify";
import { AlertProps } from "@/interfaces/propsInterfaces";

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
      await deleteById(props.id);
      toast.success("Event Deleted Successfully! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (e) {
      console.log(e);
      toast.error(
        "There was an error deleting your event, please try again later",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );
    }
    setOpen(false);
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
