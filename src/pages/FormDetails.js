import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../redux/slices/mainContext";
import { LOCAL_STORAGE } from "../constants";
//mui
import { Box, Slide, Typography } from "@mui/material";
//components
import Header from "../components/Header";
import HDialog from "../components/dialogs/HDialog";
import FormDetailsContent from "../components/FormDetailsContent";
import ActionsDialog from "../components/dialogs/ActionsDialog";

export default function FormDetails({ data }) {
  const { id } = useParams();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const formDetails = data.find((item) => item.id.toString() === id.toString());
  const [openLogout, setOpenLogout] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const handleCloseActions = () => {
    setOpenActions(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleConfirmLogOut = () => {
    localStorage.setItem(LOCAL_STORAGE.AUTH_TOKEN, "");
    dispatch(setAuthToken(""));
    navigate("/login");
  };

  return (
    <div style={styles.container}>
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
      <div style={styles.headerContainer}>
        <Header setOpenLogout={setOpenLogout} />
      </div>
      <Box style={styles.contentCard} sx={{ boxShadow: 3 }}>
        <Typography style={styles.contentHeader} variant="h4">
          Form Details
        </Typography>
        <FormDetailsContent
          id={id}
          formDetails={formDetails}
          disabledStyles={disabledStyles}
          setOpenActions={setOpenActions}
        />
      </Box>
      {openActions && (
        <ActionsDialog
          open={openActions}
          handleClose={handleCloseActions}
          actions={formDetails?.actions}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    height: "100vh",
  },
  headerContainer: { position: "absolute", width: "100vw" },
  contentCard: {
    width: "55vw",
    minHeight: "50vh",
    borderRadius: 12,
    alignSelf: "center",
    overflow: "hidden",
  },
  contentHeader: { padding: 15, color: "white", backgroundColor: "#1976d2" },
};

const disabledStyles = {
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "black",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "black",
  },
  "& input:disabled + fieldset ": {
    borderWidth: 2,
  },
  "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled": {
    borderColor: "red",
  },
};
