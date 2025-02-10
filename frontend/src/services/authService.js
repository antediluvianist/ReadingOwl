export const AuthService = {
    // Sauvegarde le token en sessionStorage
    saveToken: (token) => {
      sessionStorage.setItem("jwtToken", token);
    },
  
    // Récupère le token
    getToken: () => {
      return sessionStorage.getItem("jwtToken");
    },
  
    // Supprime le token (déconnexion)
    removeToken: () => {
      sessionStorage.removeItem("jwtToken");
    },
  
    // Vérifie si l'utilisateur est authentifié
    isAuthenticated: () => {
      return !!AuthService.getToken();
    },
  };
  