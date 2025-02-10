import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //  Vérifier si un token est déjà stocké au chargement du composant
  useEffect(() => {
    const storedToken = sessionStorage.getItem("jwtToken");
    console.log("Token récupéré après reload :", storedToken);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Identifiants incorrects !");
      }

      const data = await response.json();
      console.log("Token reçu :", data.token); // Vérifier le token reçu

      AuthService.saveToken(data.token); //  Stocker le token via le service
      sessionStorage.setItem("jwtToken", data.token); // Stocker dans sessionStorage

      console.log("Token stocké :", sessionStorage.getItem("jwtToken")); //  Vérifier le stockage

      navigate("/library"); //  Rediriger vers la bibliothèque
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
