import { useEffect, useState } from "react";
import { getBooks, updateBook } from "../services/api";
import BookCard from "../components/BookCard";
import SideMenu from "../components/SideMenu";

function Library() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [sortOption, setSortOption] = useState("date_recent");

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
    document.body.style.margin = "0"; // Solution temporaire pour supprimer les marges
    document.documentElement.style.margin = "0"; // Solution temporaire pour supprimer les marges
    const fetchBooks = async () => {
      const booksData = await getBooks();
      setBooks(booksData);
      //console.log(books);
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

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOption) {
      case "date_recent":
        return b.yearRead - a.yearRead;
      case "date_old":
        return a.yearRead - b.yearRead;
      case "title_asc":
        return a.title.localeCompare(b.title);
      case "title_desc":
        return b.title.localeCompare(a.title);
      case "author_asc":
        return a.author.localeCompare(b.author);
      case "author_desc":
        return b.author.localeCompare(a.author);
      case "rating_asc":
        return a.rating - b.rating;
      case "rating_desc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const filteredBooks = selectedCategory === "Toutes"
    ? sortedBooks
    : sortedBooks.filter((book) => book.genre1 === selectedCategory || book.genre2 === selectedCategory);

  return (
    <div style={styles.libraryContainer}>
      <SideMenu onCategorySelect={setSelectedCategory} />
      <div style={styles.libraryContent}>
        <h1>Ma Bibliothèque</h1>
        <div style={styles.inputContainer}>
          <select id="sort-select" value={sortOption} onChange={handleSortChange} style={styles.select}>
            <option value="date_recent">Trier par: Date de lecture (plus récent)</option>
            <option value="date_old">Trier par: Date de lecture (plus ancien)</option>
            <option value="title_asc">Trier par: Ordre alphabétique (A-Z)</option>
            <option value="title_desc">Trier par: Ordre alphabétique (Z-A)</option>
            <option value="author_asc">Trier par: Par auteur (A-Z)</option>
            <option value="author_desc">Trier par: Par auteur (Z-A)</option>
            <option value="rating_asc">Trier par: Par note (croissant)</option>
            <option value="rating_desc">Trier par: Par note (décroissant)</option>
          </select>
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
              book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.author.toLowerCase().includes(searchQuery.toLowerCase())
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
    backgroundColor: "rgb(10, 10, 10)",
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
  select: {
    padding: "10px",
    borderRadius: "5px",
    border: "0px solid #ccc",
    backgroundColor: "rgb(49, 49, 49)",
    color: "rgb(119, 119, 119)",
    outline: "none",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "25px",
    border: "0px solid #ccc",
    backgroundColor: "#1e1e1e",
    color: "#979797",
    outline: "none",
  },
  button: {
    padding: "12px 20px",
    backgroundColor: "rgb(75, 208, 80)",
    color: "white",
    border: "none",
    borderRadius: "25px",
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
