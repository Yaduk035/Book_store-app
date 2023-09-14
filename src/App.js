import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Signup from "../src/pages/signup";
import HomePage from "./pages/homePage";
import Test from "./pages/test";
import Login from "./pages/LoginForm";
import RequireAuth from "./components/requireAuth";
import Unauthroized from "./pages/unauthroized";
import Users from "./components/UsersTest";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
  SuperAdmin: 1993,
  Admin: 2000,
  User: 999,
};

// const ROLES = {
//   User: 2001,
//   Editor: 1984,
//   Admin: 5150,
// };

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="test" element={<Test />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="unauthorized" element={<Unauthroized />} />

        {/*Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.SuperAdmin]} />}>
            <Route path="/" element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
