import React, { useState } from "react";
//mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
//components
import formatTime from "../../utils/FormatTime";
import formatDate from "../../utils/FormatDate";

export default function ActionTable({ actions }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Action</TableCell>
            <TableCell align="center">Action Start Time</TableCell>
            <TableCell align="center">Action Waiting Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actions
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            ?.map((row, i) => (
              <TableRow
                key={`${row?.id}${i}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row?.id}</TableCell>
                <TableCell align="center">{row?.action}</TableCell>
                <TableCell align="center">
                  {formatDate(row?.actionStartTime)}
                </TableCell>
                <TableCell align="center">
                  {formatTime(row?.waitingTime)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={actions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
