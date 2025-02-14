import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Ajout
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import AddBook from "./pages/AddBook";
import ShowBook from "./pages/ShowBook";
import UpdateBook from "./pages/UpdateBook";
import Register from "./pages/Register";
import Login from "./pages/Login";

function AppRouter() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          {/* Routes protégées */}
          <Route element={<ProtectedRoute />}>
            <Route path="/library" element={<Library />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/book/:id" element={<ShowBook />} />
            <Route path="/book/:id/update" element={<UpdateBook />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRouter;