import { useEffect, useState } from "react";
import { getBooks, addBook } from "../services/api";
import BookCard from "../components/BookCard";

function Library() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche

  // Charger les livres depuis l'API au chargement de la page
  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getBooks();
      setBooks(booksData);
    };
    fetchBooks();
  }, []);

  // Ajouter un livre via l'API
  const handleAddBook = async () => {
    if (!newBook) return;
    const addedBook = await addBook({ title: newBook, author: "Auteur inconnu" });
    if (addedBook) {
      setBooks([...books, addedBook]);
      setNewBook("");
    }
  };

  // Supprimer un livre via l'API
  const handleDeleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  // Met à jour le livre
  const handleUpdateBook = (bookId, updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
    );
  };

  return (
    <div style={styles.library}>
      <h1>Ma Bibliothèque</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Rechercher un livre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Ajouter un livre..."
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddBook} style={styles.button}>Ajouter</button>
      </div>
      <div style={styles.grid}>
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((book) => (
            //<BookCard key={book.id} book={book} onDelete={handleDeleteBook} />
            <BookCard key={book.id} book={book} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />
          ))}
      </div>
    </div>
  );
}

const styles = {
  library: {
    padding: "20px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#1e1e1e",
    color: "white",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "30px",
    padding: "10px",
  },
};

export default Library;
