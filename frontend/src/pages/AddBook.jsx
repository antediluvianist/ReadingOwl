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

  const handleSelectBook = (book) => {
    const coverUrl = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : "";
  
    setFormData((prevData) => ({
      ...prevData,
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Auteur inconnu",
      cover: coverUrl,  // Ajout de l'URL de la couverture ici
      yearRead: prevData.yearRead, // Conserver la date de lecture saisie par l'utilisateur
    }));
    
    setSuggestions([]);
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
      cover: formData.cover || null
    });

    if (newBook) {
      alert("Livre ajouté avec succès !");
      window.location.href = "/library";
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
        <input type="text" name="genre1" placeholder="Genre 1 *" required onChange={handleChange} style={styles.input} />
        <input type="text" name="genre2" placeholder="Genre 2" onChange={handleChange} style={styles.input} />
        <input type="text" name="subGenre" placeholder="Sous-genre" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag1" placeholder="Tag 1" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag2" placeholder="Tag 2" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag3" placeholder="Tag 3" onChange={handleChange} style={styles.input} />
        <textarea name="comment1" placeholder="Commentaire 1" onChange={handleChange} style={styles.textarea}></textarea>
        <textarea name="comment2" placeholder="Commentaire 2" onChange={handleChange} style={styles.textarea}></textarea>
        <input type="text" name="author" placeholder="Auteur *" required onChange={handleChange} value={formData.author} style={styles.input} />
        <input type="number" name="rating" placeholder="Note" step="0.1" onChange={handleChange} style={styles.input} />

        {formData.cover && (
          <img src={formData.cover} alt="Jaquette du livre" style={{ width: "150px", marginTop: "10px" }} />
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
