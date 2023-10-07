import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/MuiHeader";
import { Button, Stack } from "@mui/material";
import img404 from "../images/unauthorized_resize.jpg";

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Unauthorized";
  }, []);

  return (
    <section>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h2
        style={{
          textAlign: "center",
          fontFamily: "monospace",
          color: "orangered",
        }}
      >
        Unauthorized
      </h2>
      <div
        className="flexGrow"
        style={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img style={{ maxWidth: "60%" }} src={img404} alt="Unauthorized" />
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

export default Unauthorized;
