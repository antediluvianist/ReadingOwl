import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => sessionStorage.getItem("jwtToken"));

  // Met à jour sessionStorage dès que le token change
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("jwtToken", token);
      fetchUserProfile(); // Récupérer les infos de l'utilisateur
    } else {
      sessionStorage.removeItem("jwtToken");
      setUser(null);
    }
  }, [token]);

  // Récupérer les infos de l'utilisateur connecté
  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Échec de la récupération du profil");
      }

      const data = await response.json();
      console.log("Utilisateur récupéré :", data);
      setUser(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      logout(); // Déconnecter en cas d'erreur
    }
  };

  // Connexion : sauvegarde le token et récupère l'utilisateur
  const login = (newToken) => {
    setToken(newToken);
  };

  // Déconnexion : supprime tout
  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour simplifier l'utilisation de l'authentification
export const useAuth = () => useContext(AuthContext);
