import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useLogout from "../hooks/useLogout";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken();
  const logOut = useLogout();

  const signOut = async () => {
    await logOut();
  };

  //   useEffect(() => {
  //     let isMounted = true;
  //     const controller = new AbortController();

  //     const getUsers = async () => {
  //       try {
  //         const response = await axiosPrivate.get("/users", {
  //           signal: controller.signal,
  //         });
  //         console.log(response.data);
  //         isMounted && setUsers(response.data);
  //       } catch (err) {
  //         console.error(err);
  //         // navigate("/login", { state: { from: location }, replace: true });
  //       }
  //     };

  //     getUsers();

  //     return () => {
  //       isMounted = false;
  //       controller.abort();
  //     };
  //   }, []);

  const getUser = async () => {
    try {
      const response = await axiosPrivate.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
      <button onClick={logOut}>Logout</button>
      <button onClick={getUser}>Show users</button>
    </article>
  );
};

export default Users;
