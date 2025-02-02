import { useState } from "react";
import { addBook } from "../services/api";

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = await addBook({
        ...formData,
        yearRead: parseInt(formData.yearRead, 10),  // Conversion en entier
        rating: formData.rating ? parseFloat(formData.rating) : null,  // Conversion en float si présent
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
        <input type="text" name="series" placeholder="Série" onChange={handleChange} style={styles.input} />
        <input type="text" name="genre1" placeholder="Genre 1 *" required onChange={handleChange} style={styles.input} />
        <input type="text" name="genre2" placeholder="Genre 2" onChange={handleChange} style={styles.input} />
        <input type="text" name="subGenre" placeholder="Sous-genre" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag1" placeholder="Tag 1" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag2" placeholder="Tag 2" onChange={handleChange} style={styles.input} />
        <input type="text" name="tag3" placeholder="Tag 3" onChange={handleChange} style={styles.input} />
        <textarea name="comment1" placeholder="Commentaire 1" onChange={handleChange} style={styles.textarea}></textarea>
        <textarea name="comment2" placeholder="Commentaire 2" onChange={handleChange} style={styles.textarea}></textarea>
        <input type="text" name="author" placeholder="Auteur *" required onChange={handleChange} style={styles.input} />
        <input type="number" name="rating" placeholder="Note" step="0.1" onChange={handleChange} style={styles.input} />

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
};

export default AddBook;
