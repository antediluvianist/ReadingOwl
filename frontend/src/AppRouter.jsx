import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import AddBook from "./pages/AddBook";


function AppRouter() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add-book" element={<AddBook />} />
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;