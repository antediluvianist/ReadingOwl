import { useState } from "react";
import { deleteBook, updateBook } from "../services/api";
import { useNavigate } from "react-router-dom";


function BookCard({ book, onDelete }) {
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

  return (
    <div style={styles.card} onClick={handleCardClick}>
      <img src={book.cover || "https://via.placeholder.com/150"} alt={book.title} style={styles.cover} />
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
    backgroundColor: "#1e1e1e",
    borderRadius: "10px",
    padding: "10px",
    color: "white",
    width: "200px",
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
  },
  rating: {
    backgroundColor: "#4caf50",
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
  },
};

export default BookCard;
