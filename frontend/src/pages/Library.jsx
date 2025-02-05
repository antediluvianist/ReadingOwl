import { useEffect, useState } from "react";
import { getBooks, updateBook } from "../services/api";
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu";

function Library() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  const updateCover = async (book) => {
    try {
      const response = await fetch("http://localhost:8000/api/upload-cover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coverUrl: book.coverUrl }),
      });

      const data = await response.json();
      if (data.coverPath) {
        await fetch(`http://localhost:8000/api/books/${book.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/merge-patch+json",
          },
          body: JSON.stringify({ cover: data.coverPath }),
        });

        console.log(`Couverture mise à jour pour le livre : ${book.title}`);

        setBooks((prevBooks) =>
          prevBooks.map((b) => (b.id === book.id ? { ...b, cover: data.coverPath } : b))
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la couverture :", error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getBooks();
      setBooks(booksData);

      booksData.forEach((book) => {
        if (!book.cover && book.coverUrl) {
          updateCover(book);
        }
      });
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = (bookId) => {
    setBooks(books.filter((book) => book.id !== bookId));
  };

  const filteredBooks = selectedCategory === "Toutes"
    ? books
    : books.filter((book) => book.genre1 === selectedCategory || book.genre2 === selectedCategory);

  return (
    <div style={styles.libraryContainer}>
      <SideMenu onCategorySelect={setSelectedCategory} />
      <div style={styles.libraryContent}>
        <h1>Ma Bibliothèque</h1>
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Rechercher un livre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.input}
          />
          <button onClick={() => window.location.href = "/add-book"} style={styles.button}>Ajouter un Livre</button>
        </div>
        <div style={styles.grid}>
          {filteredBooks
            .filter((book) =>
              book.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((book) => (
              <BookCard key={book.id} book={book} onDelete={handleDeleteBook} />
            ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  libraryContainer: {
    display: "flex",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
  },
  libraryContent: {
    flex: 1,
    padding: "20px",
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
