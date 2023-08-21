import { Button, Stack, TextField, Tooltip } from "@mui/material";
import React from "react";
import formatTime from "../utils/FormatTime";

export default function FormDetailsContent({
  id,
  formDetails,
  disabledStyles,
  setOpenActions,
}) {
  const handleActions = () => {
    setOpenActions(true);
  };
  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: "column", sm: "row" }}
        sx={{ p: 2.5, pt: 7.5 }}
      >
        <TextField
          style={{ width: "20%" }}
          label={"ID"}
          value={id}
          disabled
          sx={disabledStyles}
        />
        <TextField
          style={{ width: "40%" }}
          label={"Name"}
          value={formDetails?.name}
          disabled
          sx={disabledStyles}
        />
        <TextField
          style={{ width: "40%" }}
          label={"Phone"}
          value={formDetails?.phone}
          disabled
          sx={disabledStyles}
        />
      </Stack>
      <Stack
        spacing={3}
        direction={{ xs: "column", sm: "column", lg: "row" }}
        sx={{ p: 2.5 }}
      >
        <TextField
          style={{ width: "65%" }}
          label={"Email"}
          value={formDetails?.email}
          disabled
          sx={disabledStyles}
        />
        <TextField
          style={{ width: "35%" }}
          label={"Status"}
          value={formDetails?.formStatus}
          disabled
          sx={disabledStyles}
        />
      </Stack>
      <Stack
        spacing={3}
        direction={{ xs: "column", sm: "column", lg: "row" }}
        sx={{ p: 2.5 }}
      >
        <TextField
          style={{ width: "65%" }}
          label={"Form"}
          value={formDetails?.formName}
          disabled
          sx={disabledStyles}
        />

        <TextField
          style={{
            width: "35%",
          }}
          label={"Total waiting time"}
          value={formatTime(formDetails?.totalWaitingTime)}
          disabled
          sx={disabledStyles}
        />
      </Stack>
      <Stack
        spacing={3}
        direction={{ xs: "column", sm: "column", lg: "row" }}
        sx={{ p: 2.5 }}
      >
        <Tooltip title="View Actions" arrow>
          <Button
            style={{
              color: "white",
              backgroundColor: "#1976d2",
              padding: 15,
            }}
            onClick={handleActions}
          >
            Actions
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
}
