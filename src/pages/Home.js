import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken, setFormDataList } from "../redux/slices/mainContext";
//mui
import { Alert, Button, Slide } from "@mui/material";
//local storage
import localStorage from "redux-persist/es/storage";
import { LOCAL_STORAGE } from "../constants";
//components
import HomeTable from "../components/table";
import HDialog from "../components/dialogs/HDialog";
import Header from "../components/Header";

export default function Home() {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLogout, setOpenLogout] = useState(false);
  const formDataList = useSelector((state) => state.main.formDataList);
  const [snack, setSnack] = useState(false);
  const [howManyDeleted, setHowManyDeleted] = useState();
  const [rowsToDelete, setRowsToDelete] = useState([]);

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleConfirmLogOut = () => {
    localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, "");
    dispatch(setAuthToken(""));
    navigate("/login");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (snack) {
      setTimeout(() => {
        setSnack(false);
      }, 3000);
    }
  }, [snack]);

  const handleDeleteRows = () => {
    if (rowsToDelete.length > 0) {
      let currList = [...formDataList];
      for (const i in rowsToDelete) {
        currList = currList.filter((item) => item.id !== rowsToDelete[i]);
      }
      setHowManyDeleted(rowsToDelete.length);
      setRowsToDelete([]);
      dispatch(setFormDataList(currList));
      handleClose();
      setSnack(true);
    }
  };
  return (
    <>
      <Header setOpenLogout={setOpenLogout} />
      <div
        style={{
          padding: 50,
        }}
      >
        <Button
          disabled={rowsToDelete.length <= 0}
          style={{
            backgroundColor: rowsToDelete.length <= 0 ? "gray" : "#1976d2",
            marginBottom: 10,
            color: "white",
          }}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
        {openLogout && (
          <HDialog
            open={openLogout}
            handleClose={handleCloseLogout}
            TransitionComponent={Transition}
            aria-describedby="alert-dialog-slide-description"
            title="Logout"
            content="You will logout"
            handleConfirm={handleConfirmLogOut}
          />
        )}
        {open && (
          <HDialog
            open={open}
            TransitionComponent={Transition}
            handleClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            title="Delete"
            content={`You will delete ${rowsToDelete.length} ${
              rowsToDelete.length === 1 ? "item" : "items"
            }`}
            handleConfirm={handleDeleteRows}
          />
        )}
        <HomeTable
          rowsToDelete={rowsToDelete}
          setRowsToDelete={setRowsToDelete}
          rows={formDataList}
          setSnack={setSnack}
        />
      </div>
      {snack && (
        <Alert
          severity="success"
          onClose={() => {
            setSnack(false);
          }}
          style={styles.succ}
        >
          {howManyDeleted
            ? `Successfully Deleted ${howManyDeleted} Items`
            : "Successfully Deleted Item"}
        </Alert>
      )}
    </>
  );
}

const styles = {
  succ: {
    position: "absolute",
    bottom: 15,
    right: 15,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
  },
};
