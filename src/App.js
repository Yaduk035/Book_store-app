// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Signup from "../src/pages/signup";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginForm";
import RequireAuth from "./components/requireAuth";
import Users from "./components/UsersTest";
import PersistLogin from "./components/PersistLogin";
import BooksPage from "./pages/BooksPage";
import Book from "./pages/book";
import AccSettings from "./pages/AccSettings";
import Wishlist from "./pages/Wishlist";
import Rentlist from "./pages/Rentlist";
import PurchasePage from "./pages/PurchasePage";
import AdminControlPanel from "./pages/AdminControlPanel";
import AdminPanelRentlist from "./pages/AdminUserRentlist";
import Footer from "./components/Footer";
import Notfound from "./pages/Notfound";
import Unauthorized from './pages/Unauthorized'
import LogsPage from "./pages/LogsPage";

const ROLES = {
  Admin: 1993,
  User: 2000,
};

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="login/nouser" element={<Login msg={true} />} />
        <Route path="signup" element={<Signup />} />

        {/*Protected Routes */}
        <Route element={<PersistLogin />}>
        <Route path='/unauthorized' element={ <Unauthorized/> } />
        <Route path='/notfound' element={ <Notfound/> } />
        <Route path='*' element={ <Notfound/> } />
        <Route path="/books/:bookId" element={<Book/>} />
        <Route path="/books" element={<BooksPage/>} />
        <Route path="/" element={<HomePage />} />
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
            <Route path="/usertest" element={<Users />} />
            <Route path="/accountsettings" element={<AccSettings/>} />
            <Route path="/rentedbooks" element={<Rentlist/>} />
            <Route path="/wishlist" element={<Wishlist/>} />
            <Route path="/books/:bookId/payment" element={ <PurchasePage/> } />
        {/* <Route path="file" element={<MyDropzone />} /> */}
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />} >
            <Route path="/admincontrols" element={ <AdminControlPanel/> } />
            <Route path="/admincontrols/logs" element={ <LogsPage/> } />
            <Route path="/admincontrols/:userId/rentlist/:emailId" element={ <AdminPanelRentlist/> } />
          </Route>
        </Route>
      </Route>
    </Routes>
      <Footer/>
    </>
  );
}

export default App;
