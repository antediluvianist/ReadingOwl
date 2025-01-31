import { useEffect, useState } from "react";
import { getBooks, addBook } from "../services/api";

function Library() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");

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

  return (
    <div>
      <h1>Bibliothèque</h1>
      <input
        type="text"
        placeholder="Ajouter un livre..."
        value={newBook}
        onChange={(e) => setNewBook(e.target.value)}
      />
      <button onClick={handleAddBook}>Ajouter</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
