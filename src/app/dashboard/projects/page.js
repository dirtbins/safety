"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularWithValueLabel from "@/app/components/progress-bar";
import { Grid, Typography } from "@mui/material";

function createData(name, location, progress) {
  return { name, location, progress };
}

const rows = [];

export default function AccessibleTable() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("/api/projects", {
        method: "GET",
      });
      return response.json();
    };

    fetchProjects().then((response) => {
      console.log(response);
      setRows(response);
    });
  }, []);
  return (
    <React.Fragment>
      <br />

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography color="#1976d2" variant="h6">
          Projects
        </Typography>
      </Grid>
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>Progress may take 24hrs to update</caption>
          <TableHead sx={{ backgroundColor: "#000000DE" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Project Name/Alias</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="right">Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="right">
                  <CircularWithValueLabel progress={row.progress} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
