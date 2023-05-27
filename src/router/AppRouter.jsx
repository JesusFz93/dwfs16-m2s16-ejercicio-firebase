import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "../components/NavBar";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import CustomersPage from "../pages/CustomersPage";
import CustomerPage from "../pages/CustomerPage";
import UseStatePage from "../pages/UseStatePage";
import PostsPage from "../pages/PostsPage";
import BooksPage from "../pages/BooksPage";
import CrudPage from "../pages/CrudPage";
import PeliculasPage from "../pages/PeliculasPage";

const AppRouter = () => {
  return (
    <>
      <Router>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/:id" element={<CustomerPage />} />
            <Route path="/use-state" element={<UseStatePage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/crud" element={<CrudPage />} />
            <Route path="/peliculas" element={<PeliculasPage />} />

            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default AppRouter;
