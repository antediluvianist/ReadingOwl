import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirige vers la page de connexion
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default LogoutButton;
