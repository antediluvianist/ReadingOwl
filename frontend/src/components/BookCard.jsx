import { useState } from "react";
import { deleteBook, updateBook } from "../services/api";

function BookCard({ book, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({ title: book.title, author: book.author });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(`Supprimer "${book.title}" ?`);
    if (confirmDelete) {
      const success = await deleteBook(book.id);
      if (success) {
        onDelete(book.id);
      }
    }
  };

  const handleUpdate = async () => {
    const updatedBook = await updateBook(book.id, {
      ...book,               // Inclut toutes les propriétés actuelles du livre
      title: editedBook.title,
      author: editedBook.author,
      yearRead: book.yearRead || 2024,  // Définit une valeur par défaut si absente
    });
  
    if (updatedBook) {
      onUpdate(book.id, updatedBook);
      setIsEditing(false);
    }
  };

  return (
    <div style={styles.card}>
      <img src={book.cover || "https://via.placeholder.com/150"} alt={book.title} style={styles.cover} />
      <div style={styles.info}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedBook.title}
              onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              value={editedBook.author}
              onChange={(e) => setEditedBook({ ...editedBook, author: e.target.value })}
              style={styles.input}
            />
            <button onClick={handleUpdate} style={styles.saveButton}>💾 Enregistrer</button>
          </>
        ) : (
          <>
            <h3>{book.title}</h3>
            <p><strong>{book.author}</strong></p>
            <p>{book.genre1}{book.subGenre && ` - ${book.subGenre}`}</p>
            <p>Lu le {book.yearRead}</p>
          </>
        )}
      </div>
      <div style={styles.actions}>
        <button onClick={() => setIsEditing(!isEditing)} style={styles.editButton}>
          {isEditing ? "✏️ Annuler" : "✏️ Modifier"}
        </button>
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
  editButton: {
    backgroundColor: "orange",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px",
    cursor: "pointer",
    marginTop: "5px",
  },
  input: {
    width: "90%",
    padding: "5px",
    marginBottom: "5px",
    borderRadius: "3px",
    border: "1px solid #ccc",
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
