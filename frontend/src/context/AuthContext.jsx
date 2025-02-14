import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => sessionStorage.getItem("jwtToken"));
  const [isLoading, setIsLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    console.log("🔍 Token actuel :", token);
    if (token) {
      sessionStorage.setItem("jwtToken", token);
      fetchUserProfile();
    } else {
      console.log("⚠️ Aucun token trouvé, suppression de sessionStorage.");
      sessionStorage.removeItem("jwtToken");
      setUser(null);
      setIsLoading(false); // Met fin au chargement même si aucun token
    }
  }, [token]);

  const fetchUserProfile = async () => {
    if (!token) {
      console.warn("❌ Tentative de récupération du profil sans token.");
      setIsLoading(false); // Arrêter le chargement même si pas de token
      return;
    }

    try {
      console.log("📡 Requête pour récupérer l'utilisateur...");
      const response = await fetch("http://localhost:8000/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Échec de la récupération du profil (Code ${response.status})`);
      }

      const data = await response.json();
      console.log("✅ Utilisateur récupéré :", data);
      setUser(data);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération du profil :", error.message);
      logout();
    } finally {
      setIsLoading(false); // Le chargement est terminé, qu'il y ait une erreur ou non
    }
  };

  const login = (newToken) => {
    console.log("🔑 Connexion réussie, stockage du token :", newToken);
    setToken(newToken);
  };

  const logout = () => {
    console.warn("🚪 Déconnexion en cours...");
    sessionStorage.removeItem("jwtToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
