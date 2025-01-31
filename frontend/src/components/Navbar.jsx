import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Reading Tracker</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>Accueil</Link>
        </li>
        <li>
            <Link to="/library" style={styles.link}>Bibliothèque</Link>
        </li>
        <li>
          <Link to="/about" style={styles.link}>À propos</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#282c34",
    color: "white",
  },
  logo: { margin: 0 },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1rem",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.2rem",
  },
};

export default Navbar;
