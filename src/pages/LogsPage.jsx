import React, { useState } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import { axiosPrivate } from "../api/axios";
import Header from "../components/MuiHeader";
import { Download, Refresh } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const LogsPage = () => {
  const [reqlogs, setReqlogs] = useState();
  const [errorlogs, setErrorlogs] = useState();
  const [reqFetching, setReqFetching] = useState(false);
  const [errFetching, setErrFetching] = useState(false);

  const getReqLogs = async () => {
    try {
      setReqFetching(true);
      const response = await axiosPrivate.get(`/users/logfiles/reqlogs`);
      const logs = response.data;
      setReqlogs(logs);
      setReqFetching(false);
    } catch (error) {
      console.log(error);
      setReqFetching(false);
    }
  };

  const getErrorLogs = async () => {
    try {
      setErrFetching(true);
      const response = await axiosPrivate.get(`/users/logfiles/errorlogs`);
      const logs = response.data;
      setErrorlogs(logs);
      setErrFetching(false);
    } catch (error) {
      console.log(error);
      setErrFetching(false);
    }
  };

  const downloadLogs = (value) => {
    try {
      const blob = new Blob(value === "reqlogs" ? [reqlogs] : [errorlogs], {
        type: "text/plain",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;

      link.download = `${value}.txt`;

      link.click();

      URL.revokeObjectURL(link);

      if (link.parentNode) {
        document.body.removeChild(link);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Box sx={{ maxWidth: 1000, margin: "auto", padding: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
          Api request logs
        </Typography>
        <Paper
          sx={{
            maxHeight: 500,
            overflow: "auto",
            padding: 2,
            whiteSpace: "pre-wrap",
            borderRadius: "10px",
            backgroundColor: "black",
            color: "wheat",
          }}
        >
          <Typography
            sx={{
              padding: "10px",
            }}
          >
            {reqlogs || (
              <>
                Click on the{" "}
                <Refresh sx={{ fontSize: "1.5em", marginBottom: "0.1em" }} />{" "}
                button to fetch logs
              </>
            )}
          </Typography>
        </Paper>
        <br />
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Grid item>
            <Button
              onClick={() => downloadLogs("reqlogs")}
              variant="contained"
              color="error"
              disabled={!reqlogs}
            >
              <Download />
              Request logs
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={getReqLogs}
              variant="outlined"
              color="success"
              disabled={reqFetching}
            >
              {reqFetching ? <CircularProgress size={20} /> : <Refresh />}
            </Button>
          </Grid>
        </Grid>
        <br />
      </Box>
      <Box sx={{ maxWidth: 1000, margin: "auto", padding: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: "monospace" }}>
          Error logs
        </Typography>
        <Paper
          sx={{
            maxHeight: 400,
            overflow: "auto",
            padding: 2,
            whiteSpace: "pre-wrap",
            borderRadius: "10px",
            backgroundColor: "black",
            color: "wheat",
          }}
        >
          <Typography sx={{ padding: "10px" }}>
            {errorlogs || (
              <>
                Click on the{" "}
                <Refresh sx={{ fontSize: "1.5em", marginBottom: "0.1em" }} />{" "}
                button to fetch logs
              </>
            )}
          </Typography>
        </Paper>
        <br />
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Grid item>
            <Button
              onClick={() => downloadLogs("errorlogs")}
              variant="contained"
              color="error"
              disabled={!errorlogs}
            >
              <Download />
              Error logs
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={getErrorLogs}
              variant="outlined"
              color="success"
              disabled={errFetching}
            >
              {errFetching ? <CircularProgress size={20} /> : <Refresh />}
            </Button>
          </Grid>
        </Grid>
        <br />
      </Box>
    </>
  );
};

export default LogsPage;
