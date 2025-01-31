import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const getBooks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data.member; 
    } catch (error) {
      console.error("Erreur lors de la récupération des livres :", error);
      return [];
    }
  };
  

export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books`, bookData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre :", error);
    return null;
  }
};
