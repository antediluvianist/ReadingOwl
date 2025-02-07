import { Link } from "react-router-dom";
import logo from "../assets/logo-mini.png";
import profileIcon from "../assets/profile-icon.png";

import "./styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Reading Tracker Logo" className="navbar__logo" />
      </Link>
      <ul className="navbar-links">
        <li><Link to="/library" className="navbar-links__link">Bibliothèque</Link></li>
        <li><Link to="/pal" className="navbar-links__link">PAL</Link></li>
        <li><Link to="/recommendations" className="navbar-links__link">Recommandations</Link></li>
        <li><Link to="/wishlist" className="navbar-links__link">Wishlist</Link></li>
        <li><Link to="/missions" className="navbar-links__link">Missions</Link></li>
        <li><Link to="/achievements" className="navbar-links__link">Succès</Link></li>
      </ul>
      <Link to="/profile">
        <img src={profileIcon} alt="Profil" className="navbar__profile-icon" />
      </Link>
    </nav>
  );
}

export default Navbar;
