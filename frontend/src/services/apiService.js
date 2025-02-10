import { AuthService } from "./authService";

export const apiService = async (url, options = {}) => {
  const token = AuthService.getToken();

  // Ajoute automatiquement le token si disponible
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Erreur API");
  }
  return response.json();
};
