import React, { useState } from "react";
import axios from "axios";

const Test = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handleUser = (e) => {
    setUser(e.target.value);
  };
  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        user,
        pwd,
      };
      console.log(userData);

      const jsonData = JSON.stringify(userData);
      const response = await axios.post(
        "http://localhost:4000/auth",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">email</label>
      <input type="text" value={user} onChange={handleUser}></input>
      <label htmlFor="">password</label>
      <input type="password" value={pwd} onChange={handlePwd}></input>
      <button type="submit">Log In</button>
    </form>
  );
};

export default Test;
