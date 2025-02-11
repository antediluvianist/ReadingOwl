import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Récupérer le token JWT stocké dans sessionStorage
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("jwtToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Récupérer tous les livres de l'utilisateur connecté
export const getBooks = async () => {
  console.log("Token envoyé avec la requête :", sessionStorage.getItem("jwtToken")); // Debug

  try {
    const response = await axios.get(`${API_BASE_URL}/books`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    console.log("Réponse de getBooks :", response.data);
    return response.data.member || []; // Vérifier qu'on retourne bien un tableau
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error.response ? error.response.data : error);
    return [];
  }
};

// Récupérer les informations de l'utilisateur connecté
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos utilisateur :", error);
    return null;
  }
};

// Fonction pour récupérer les catégories personnalisées
export const getCustomCategories = async () => {
  const token = sessionStorage.getItem("jwtToken"); // Vérifie que le token est bien utilisé
  console.log("Token envoyé avec la requête (catégories) :", token); // Debug

  try {
    const response = await axios.get(`${API_BASE_URL}/custom-categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Ajout du token
      },
    });

    console.log("Réponse de getCustomCategories :", response.data); // Debug
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des catégories personnalisées :",
      error.response ? error.response.data : error
    );
    return [];
  }
};


// Récupérer un livre spécifique par ID
export const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
    return null;
  }
};

// Ajouter un livre
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books`, bookData, {
      headers: {
        "Content-Type": "application/ld+json",
        ...getAuthHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    return null;
  }
};

// Supprimer un livre
export const deleteBook = async (bookId) => {
  try {
    await axios.delete(`${API_BASE_URL}/books/${bookId}`, {
      headers: getAuthHeaders(),
    });

    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du livre :", error);
    return false;
  }
};

// Mettre à jour un livre
export const updateBook = async (bookId, updatedData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/books/${bookId}`, updatedData, {
      headers: {
        "Content-Type": "application/merge-patch+json",
        ...getAuthHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    return null;
  }
};

// Rechercher des livres via Open Library
export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    return response.data.docs.slice(0, 5);
  } catch (error) {
    console.error("Erreur lors de la recherche de livres sur Open Library :", error);
    return [];
  }
};

// Récupérer les détails d'un livre via Open Library
export const fetchBookDetails = async (title) => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    const data = await response.json();
    return data.docs.length > 0 ? data.docs[0] : null;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du livre :", error);
    return null;
  }
};
