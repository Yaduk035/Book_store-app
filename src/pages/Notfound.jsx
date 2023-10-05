import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../images/2451354.jpg";
import Header from "../components/MuiHeader";
import { Button, Stack } from "@mui/material";

const Notfound = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/login");

  return (
    <section>
      <Header />
      <br />
      <br />

      <br />
      <div
        className="flexGrow"
        style={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ maxWidth: "50%" }} src={errorImage} alt="" />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={5}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/")}
            size="large"
          >
            Go Home
          </Button>
          <Button variant="contained" size="large" onClick={() => navigate(-3)}>
            Go Back
          </Button>
        </Stack>
      </div>
      <br />
      <br />
      <br />
      <br />
    </section>
  );
};

export default Notfound;
