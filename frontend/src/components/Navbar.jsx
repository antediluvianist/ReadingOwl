import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo-mini.png";
import profileIcon from "../assets/profile-icon.png";

import "./styles/Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Rediriger vers la page de connexion après déconnexion
  };

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

      <div className="navbar__right">
        {user ? (
          <>
            <Link to="/profile">
              <img src={profileIcon} alt="Profil" className="navbar__profile-icon" />
            </Link>
            <button onClick={handleLogout} className="navbar__logout-btn">Déconnexion</button>
          </>
        ) : (
          <div className="navbar__auth">
            <Link to="/login" className="navbar-links__link">Connexion</Link>
            <Link to="/register" className="navbar-links__link">S'inscrire</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
