import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Avatar, Chip, TableSortLabel } from "@mui/material";
import styled from "styled-components";

export default function CollapsibleTable() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#000000DE",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <TableSortLabel></TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>Date</TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>Locatiton</TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>Staff ID</TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>Incident</TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>
                <TableSortLabel>Priority</TableSortLabel>
              </StyledTableCell>
              <StyledTableCell align={"right"}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      height: 42,
                      width: 42,
                      backgroundColor: "dark.main",
                    }}
                  >
                    RT
                  </Avatar>
                  <Box sx={{ ml: 1 }}></Box>
                </Box>
              </TableCell>
              <TableCell>05/07/2023</TableCell>
              <TableCell>Site B29F</TableCell>
              <TableCell>Richard Taylor (789966)</TableCell>
              <TableCell>Cut to index finger</TableCell>
              <TableCell>
                <Chip label="Low" color="primary" />
              </TableCell>
            </TableRow>
            <TableRow hover>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      height: 42,
                      width: 42,
                      backgroundColor: "dark.main",
                    }}
                  >
                    TA
                  </Avatar>
                  <Box sx={{ ml: 1 }}></Box>
                </Box>
              </TableCell>
              <TableCell>03/06/2023</TableCell>
              <TableCell>Site B29F</TableCell>
              <TableCell>Timothy Andrews (763792)</TableCell>
              <TableCell>Sprained ankle</TableCell>
              <TableCell>
                <Chip label="Low" color="primary" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
