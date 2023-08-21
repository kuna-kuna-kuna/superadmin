import { Typography } from "@mui/material";
import React from "react";
import Iconify from "./iconify/Iconify";

export default function Header({ setOpenLogout }) {
  const handleLogout = () => {
    setOpenLogout(true);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "7.5vh",
        backgroundColor: "#1976d2",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        style={{ fontWeight: 700, color: "white", paddingInline: 10 }}
      >
        SuperAdmin
      </Typography>
      <Iconify
        onClick={handleLogout}
        color="white"
        style={{ position: "absolute", right: 25 }}
        size={40}
        icon="streamline:interface-logout-arrow-exit-frame-leave-logout-rectangle-right"
      ></Iconify>
    </div>
  );
}
