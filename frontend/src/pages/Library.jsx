import { useContext, useState } from "react";
import { ReadingContext } from "../context/ReadingContext";

function Library() {
  const { books, addBook } = useContext(ReadingContext);
  const [newBook, setNewBook] = useState("");

  return (
    <div>
      <h1>Bibliothèque</h1>
      <input
        type="text"
        placeholder="Ajouter un livre..."
        value={newBook}
        onChange={(e) => setNewBook(e.target.value)}
      />
      <button onClick={() => { addBook(newBook); setNewBook(""); }}>
        Ajouter
      </button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Library;
