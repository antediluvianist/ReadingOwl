import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// Fonction pour rechercher des livres via l'API Open Library
export const searchBooks = async (query) => {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    return response.data.docs.slice(0, 5); // On limite à 5 résultats pour ne pas noyer l'utilisateur sous un surplus d'informations
  } catch (error) {
    console.error("Erreur lors de la recherche de livres sur Open Library :", error);
    return [];
  }
};

// Fonction pour récupérer les détails d'un livre via Open Library
export const fetchBookDetails = async (title) => {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    const data = await response.json();

    if (data.docs && data.docs.length > 0) {
      return data.docs[0]; // Retourne le premier résultat trouvé
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du livre :", error);
    return null;
  }
};



// Fonction pour récupérer tous les livres
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data.member;
  } catch (error) {
    console.error("Erreur lors de la récupération des livres :", error);
    return [];
  }
};

// Fonction pour récupérer un livre spécifique
export const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du livre :", error);
    return null;
  }
};

// Fonction pour ajouter un livre
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books`, bookData, {
      headers: { "Content-Type": "application/ld+json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    return null;
  }
};

// Fonction pour supprimer un livre
export const deleteBook = async (bookId) => {
  try {
    await axios.delete(`${API_BASE_URL}/books/${bookId}`);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du livre :", error);
    return false;
  }
};

// Fonction pour mettre à jour un livre
export const updateBook = async (bookId, updatedData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/books/${bookId}`, updatedData, {
      headers: { "Content-Type": "application/merge-patch+json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du livre :", error);
    return null;
  }
};

