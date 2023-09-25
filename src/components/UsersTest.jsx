import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import useLogout from "../hooks/useLogout";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();
  const logOut = useLogout();
  const currentUser = localStorage.getItem("user");

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
      const response = await axiosPrivate.get(
        "/users/6502b24dbcf3ef7ab606f858"
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <article>
      <h1>Hello {currentUser} </h1>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.email}</li>
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
