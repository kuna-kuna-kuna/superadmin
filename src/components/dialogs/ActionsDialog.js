import * as React from "react";
//mui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ActionTable from "../table/ActionTable";

export default function ActionsDialog({ open, handleClose, actions }) {
  let sortedActions = [...actions];
  sortedActions = sortedActions.sort(
    (a, b) => new Date(a.actionStartTime) - new Date(b.actionStartTime)
  );

  return (
    <React.Fragment>
      <Dialog maxWidth={"lg"} open={open} onClose={handleClose}>
        <DialogTitle>Actions</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "55vw",
              height: "55vh",
            }}
          >
            <ActionTable actions={sortedActions} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
