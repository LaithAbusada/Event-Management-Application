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
import { AlertProps } from "@/interfaces";
import { TOAST_TYPES } from "@/constants/toastEnums";
import { showToast } from "@/helpers/toast";
import Loading from "../../public/icons/Loading.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setEvents } from "@/state/events/eventsSlice";

export default function AlertDialog({ id }: AlertProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const events = useSelector((state: RootState) => state.events.data);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleAgree() {
    setLoading(true);
    try {
      await deleteById(id);
      const newEvents = events?.filter((item) => item.id != id);
      dispatch(setEvents(newEvents));
      setLoading(false);

      showToast(TOAST_TYPES.SUCCESS, "Event Deleted Successfully! ");
    } catch (e) {
      console.log(e);
      showToast(
        TOAST_TYPES.ERROR,
        "There was an error deleting your event, please try again later"
      );
    }
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Tooltip title="Delete">
        <IconButton onClick={handleClickOpen}>
          <DeleteIcon
            className="text-red-500 hover:text-red-900"
            fontSize="large"
          />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this event?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to delete
            this event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <h2>
              Please wait{" "}
              <Loading className="inline mr-2 w-4 h-4 text-gray-200 animate-spin " />
            </h2>
          ) : (
            <>
              <Button onClick={handleAgree} style={{ color: "red" }}>
                Delete
              </Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
