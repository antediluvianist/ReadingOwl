import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Library from "./pages/Library";
import AddBook from "./pages/AddBook";
import ShowBook from "./pages/ShowBook";
import UpdateBook from "./pages/UpdateBook";


function AppRouter() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<Library />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book/:id" element={<ShowBook />} />
          <Route path="/book/:id/update" element={<UpdateBook />} />
        </Routes>
      </Router>
    );
  }
  
  export default AppRouter;