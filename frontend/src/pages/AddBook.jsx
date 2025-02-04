import { useState, useEffect } from "react";
import { addBook, searchBooks } from "../services/api";

function AddBook() {
  const [formData, setFormData] = useState({
    yearRead: "",
    title: "",
    series: "",
    genre1: "",
    genre2: "",
    subGenre: "",
    tag1: "",
    tag2: "",
    tag3: "",
    comment1: "",
    comment2: "",
    author: "",
    rating: "",
    cover: ""
  });

  const genres = ["Action", "Aventure", "SF", "Horreur", "Fantastique", "Fantasy", "Romance", "Historique"];

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (formData.title.length > 2) {
        const results = await searchBooks(formData.title);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [formData.title]);

  const handleSelectBook = async (book) => {
    const coverUrl = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : "";

    setFormData((prevData) => ({
      ...prevData,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Auteur inconnu",
      yearRead: prevData.yearRead,
    }));

    setSuggestions([]);

    if (coverUrl) {
      try {
        const response = await fetch("http://localhost:8000/api/upload-cover", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coverUrl }),
        });

        const data = await response.json();
        if (data.coverPath) {
          setFormData((prevData) => ({
            ...prevData,
            cover: data.coverPath,
          }));
        }
      } catch (error) {
        console.error("Erreur lors de l'upload de la couverture :", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = await addBook({
      ...formData,
      yearRead: parseInt(formData.yearRead, 10),
      rating: formData.rating ? parseFloat(formData.rating) : null,
      cover: formData.cover || null,
    });

    if (newBook) {
      alert("Livre ajouté avec succès !");
      window.location.href = "/library";

      let attempts = 0;
      const maxAttempts = 5;

      const checkCoverInterval = setInterval(async () => {
        attempts++;

        if (formData.cover) {
          try {
            await fetch(`http://localhost:8000/api/books/${newBook.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/merge-patch+json",
              },
              body: JSON.stringify({ cover: formData.cover }),
            });
            clearInterval(checkCoverInterval);
          } catch (error) {
            console.error("Erreur lors de la mise à jour de la couverture :", error);
          }
        }

        if (attempts >= maxAttempts) {
          clearInterval(checkCoverInterval);
          console.warn("Téléchargement de la couverture trop long, abandon de la mise à jour.");
        }
      }, 2000);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Ajouter un Livre</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="number" name="yearRead" placeholder="Année de lecture *" required onChange={handleChange} style={styles.input} />
        <input type="text" name="title" placeholder="Titre *" required onChange={handleChange} style={styles.input} />

        {suggestions.length > 0 && (
          <ul style={styles.suggestions}>
            {suggestions.map((book) => (
              <li key={book.key} onClick={() => handleSelectBook(book)} style={styles.suggestionItem}>
                <strong>{book.title}</strong> <br />
                <small>{book.author_name ? book.author_name.join(", ") : "Auteur inconnu"}</small>
              </li>
            ))}
          </ul>
        )}

        <input type="text" name="series" placeholder="Série" onChange={handleChange} style={styles.input} />

        <select name="genre1" required onChange={handleChange} style={styles.input}>
          <option value="">Sélectionnez un genre *</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <select name="genre2" onChange={handleChange} style={styles.input}>
          <option value="">Sélectionnez un second genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <input type="text" name="subGenre" placeholder="Sous-genre" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag1" placeholder="Tag 1" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag2" placeholder="Tag 2" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag3" placeholder="Tag 3" onChange={handleChange} style={styles.input} />
        <textarea name="comment1" placeholder="Commentaire 1" onChange={handleChange} style={styles.textarea}></textarea>
        <textarea name="comment2" placeholder="Commentaire 2" onChange={handleChange} style={styles.textarea}></textarea>
        <input type="text" name="author" placeholder="Auteur *" required onChange={handleChange} value={formData.author} style={styles.input} />
        <input type="number" name="rating" placeholder="Note" step="0.1" onChange={handleChange} style={styles.input} />

        {formData.cover && (
          <img src={`http://localhost:8000${formData.cover}`} alt="Jaquette du livre" style={{ width: "150px", marginTop: "10px" }} />
        )}

        <button type="submit" style={styles.button}>Ajouter</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  textarea: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    backgroundColor: "#1e1e1e",
    color: "white",
    resize: "vertical",
    minHeight: "60px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  suggestions: {
    backgroundColor: "#1e1e1e",
    border: "1px solid #333",
    borderRadius: "5px",
    listStyle: "none",
    padding: "5px",
    margin: "5px 0",
    maxHeight: "200px",
    overflowY: "auto",
  },
  suggestionItem: {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #333",
  },
};

export default AddBook;
