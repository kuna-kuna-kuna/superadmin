import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//mui
import {
  Checkbox,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Iconify from "../iconify/Iconify";
import { useDispatch } from "react-redux";
import { setFormDataList } from "../../redux/slices/mainContext";

const colors = {
  pending: "gray",
  accepted: "green",
  rejected: "#eb4c34",
};

export default function HomeTable({
  rowsToDelete,
  setRowsToDelete,
  rows,
  setSnack,
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleMoreDetails = (id) => {
    navigate(`/form-details/${id}`);
  };
  const handleDeleteRow = (id) => {
    let rowsCurr = rows.filter((item) => item.id !== id);
    dispatch(setFormDataList(rowsCurr));
    setSnack(true);
  };
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Form Name</TableCell>
            <TableCell align="center">Form Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, i) => (
              <TableRow
                key={`${row?.id}${i}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <Checkbox
                    name={`checkbox${row.id}`}
                    checked={rowsToDelete?.includes(row.id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setRowsToDelete([...rowsToDelete, row?.id]);
                      } else {
                        let filterArray = [...rowsToDelete];
                        filterArray = filterArray.filter(
                          (item) => item !== row?.id
                        );
                        setRowsToDelete(filterArray);
                      }
                    }}
                  />
                </TableCell>
                <TableCell align="center">{row?.id}</TableCell>
                <TableCell align="center">{row?.name}</TableCell>
                <TableCell align="center">{row?.email}</TableCell>
                <TableCell align="center">{row?.phone}</TableCell>
                <TableCell align="center">{row?.formName}</TableCell>
                <TableCell
                  align="center"
                  style={{ color: colors[row?.formStatus] }}
                >
                  {row?.formStatus}
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>
                  {rowsToDelete <= 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Tooltip title="Form details" arrow>
                        <IconButton onClick={() => handleMoreDetails(row.id)}>
                          <Iconify
                            icon={"gg:details-more"}
                            width={24}
                            height={24}
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete row" arrow>
                        <IconButton onClick={() => handleDeleteRow(row.id)}>
                          <Iconify
                            icon={"ic:baseline-delete"}
                            width={24}
                            height={24}
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
