import { useState } from "react";
import { deleteBook } from "../services/api";
import { useNavigate } from "react-router-dom";

import "./styles/BookCard.css";

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
  console.log("Cover path:", book.cover);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();
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

  const getDefaultCover = (genre) => {
    switch (genre.toLowerCase()) {
      case "action": return actionCover;
      case "aventure": return aventureCover;
      case "fantastique": return fantasticCover;
      case "fantasy": return fantasyCover;
      case "historique": return historicalCover;
      case "horror": return horrorCover;
      case "sf": return sfCover;
      default: return defaultCover;
    }
  };

  return (
    <div className="bookcard" onClick={handleCardClick}>
      <img 
        src={book.cover && book.cover !== "" ? `http://localhost:8000${book.cover}` : getDefaultCover(book.genre1)} 
        alt={book.title} 
        className="bookcard__cover"
        onError={(e) => e.target.src = getDefaultCover(book.genre1)}
      />
      <div className="bookcard-info">
        <h3 className="bookcard-info__title">{book.title}</h3>
        <p className="bookcard-info__author"><strong>{book.author}</strong></p>
        <p className="bookcard-info__category">{book.genre1}{book.subGenre && ` - ${book.subGenre}`}</p>
        <p className="bookcard-info__year">Lu en {book.yearRead}</p>
      </div>
      <div className="bookcard-actions">
        <button onClick={handleDelete} className="bookcard-action__delete-button">🗑️</button>
        <div className="bookcard-actions__rating">{book.rating}</div>
      </div>
    </div>
  );
}

export default BookCard;
