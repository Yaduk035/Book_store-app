import axios from "../api/axios";
import useAuth from "./useAuth";
import { useData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { addBook } = useData();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});
    addBook("");
    try {
      await axios("/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  localStorage.setItem("loggedOut", true);
  // localStorage.setItem("role", "");
  return logout;
};

export default useLogout;
