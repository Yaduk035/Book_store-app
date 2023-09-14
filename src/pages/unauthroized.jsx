import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate("/login");

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div
        className="flexGrow"
        style={{
          flexGrow: "1",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <button onClick={goBack}>Go to login</button>
      </div>
    </section>
  );
};

export default Unauthorized;
