import { useState } from "react";
import { deleteBook } from "../services/api";
import { useNavigate } from "react-router-dom";

// Import des images par défaut
import actionCover from "../assets/category_cover/category_action.webp";
import aventureCover from "../assets/category_cover/category_aventure.webp";
import fantasticCover from "../assets/category_cover/category_fantastique.webp";
import fantasyCover from "../assets/category_cover/category_fantasy.webp";
import historicalCover from "../assets/category_cover/category_historique.webp";
import horrorCover from "../assets/category_cover/category_horror.webp";
import sfCover from "../assets/category_cover/category_sf.webp";

import defaultCover from "../assets/category_cover/category_default.webp";

function BookCard({ book, onDelete }) {
  console.log("Cover path:", book.cover);//test
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation(); // Empêche le clic de rediriger lors de la suppression
    const confirmDelete = window.confirm(`Supprimer "${book.title}" ?`);
    if (confirmDelete) {
      const success = await deleteBook(book.id);
      if (success) {
        onDelete(book.id);
      }
    }
  };

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  // Fonction pour déterminer l'image de couverture par défaut selon le genre
  const getDefaultCover = (genre) => {
    switch (genre.toLowerCase()) {
      case "action":
        return actionCover;
      case "aventure":
        return aventureCover;
      case "fantastique":
        return fantasticCover;
      case "fantasy":
        return fantasyCover;
      case "historique":
        return historicalCover;
      case "horror":
        return horrorCover;
      case "sf":
        return sfCover;
      default:
        return defaultCover; // Image de secours si aucun genre ne correspond
    }
  };

  return (
    <div style={styles.card} onClick={handleCardClick}>
      {console.log("Cover path:", book.cover)} 
      <img 
          src={book.cover && book.cover !== "" ? `http://localhost:8000${book.cover}` : getDefaultCover(book.genre1)} 
          alt={book.title} 
          style={styles.cover}
          onError={(e) => e.target.src = getDefaultCover(book.genre1)} // Si l'image échoue, afficher l'image par défaut
      />

      <div style={styles.info}>
        <h3>{book.title}</h3>
        <p><strong>{book.author}</strong></p>
        <p>{book.genre1}{book.subGenre && ` - ${book.subGenre}`}</p>
        <p>Lu le {book.yearRead}</p>
      </div>
      <div style={styles.actions}>
        <button onClick={handleDelete} style={styles.deleteButton}>🗑️</button>
        <div style={styles.rating}>{book.rating}</div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "rgb(18, 18, 18)",
    borderRadius: "10px",
    padding: "0px",
    color: "rgb(150, 150, 150)",
    width: "250px",
    textAlign: "center",
    position: "relative",
    cursor: "pointer", // Rend la carte cliquable
    transition: "transform 0.2s",
  },
  cover: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  info: {
    marginTop: "10px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
    cursor: "pointer",
    marginLeft: "25px",
  },
  rating: {
    backgroundColor: "#4caf50",
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    marginRight: "25px",
  },
};

export default BookCard;