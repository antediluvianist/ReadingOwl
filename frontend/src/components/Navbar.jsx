import { Link } from "react-router-dom";
import logo from "../assets/logo-mini.png";
import profileIcon from "../assets/profile-icon.png";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <Link to="/">
        <img src={logo} alt="Reading Tracker Logo" style={styles.logo} />
      </Link>
      <ul style={styles.navLinks}>
        <li><Link to="/library" style={styles.link}>Bibliothèque</Link></li>
        <li><Link to="/pal" style={styles.link}>PAL</Link></li>
        <li><Link to="/recommendations" style={styles.link}>Recommandations</Link></li>
        <li><Link to="/wishlist" style={styles.link}>Wishlist</Link></li>
        <li><Link to="/missions" style={styles.link}>Missions</Link></li>
        <li><Link to="/achievements" style={styles.link}>Succès</Link></li>
      </ul>
      <Link to="/profile">
        <img src={profileIcon} alt="Profil" style={styles.profileIcon} />
      </Link>
    </nav>
  );
}

const styles = {
  navbar: {
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
     padding: "10px 20px",
     background: "#111111"
  },

  logo: {
    height: "40px"
  },

  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "20px"
  },

  link: {
    color: "white",
     textDecoration: "none",
      fontSize: "16px"
    },

  profileIcon: {
     height: "40px",
      borderRadius: "50%" 
    }
};

export default Navbar;
