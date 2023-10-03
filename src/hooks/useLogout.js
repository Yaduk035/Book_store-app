import axios from "../api/axios";
import useAuth from "./useAuth";
import { useData } from "../context/DataContext";

const useLogout = () => {
  const { setAuth } = useAuth();
  const { addBook } = useData();

  const logout = async () => {
    setAuth({});
    addBook("");
    try {
      const response = await axios("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  localStorage.setItem("loggedOut", true);
  // localStorage.setItem("role", "");
  return logout;
};

export default useLogout;
