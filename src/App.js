// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Signup from "../src/pages/signup";
import HomePage from "./pages/HomePage";
import Test from "./pages/test";
import Login from "./pages/LoginForm";
import RequireAuth from "./components/requireAuth";
import Unauthroized from "./pages/unauthroized";
import Users from "./components/UsersTest";
import PersistLogin from "./components/PersistLogin";
import BooksPage from "./pages/BooksPage";
import Book from "./pages/book";
import ImgUploads from "./components/ImgUploads";
import AccSettings from "./pages/AccSettings";
import MyDropzone from './pages/SelectFiles';
import Wishlist from "./pages/Wishlist";
import Rentlist from "./pages/Rentlist";
import PurchasePage from "./pages/PurchasePage";

const ROLES = {
  Admin: 1993,
  User: 2000,
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
        <Route path="image" element={<ImgUploads />} />

        {/*Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/usertest" element={<Users />} />
            <Route path="/books" element={<BooksPage/>} />
            <Route path="/accountsettings" element={<AccSettings/>} />
            <Route path="/rentedbooks" element={<Rentlist/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/books/:bookId/payment" element={ <PurchasePage/> } />
            <Route path="/books/:bookId" element={<Book/>} />
        {/* <Route path="file" element={<MyDropzone />} /> */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
