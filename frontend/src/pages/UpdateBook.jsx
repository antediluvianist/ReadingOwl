import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, updateBook } from "../services/api";

function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    yearRead: "",
    series: "",
    genre1: "",
    genre2: "",
    subGenre: "",
    tag1: "",
    tag2: "",
    tag3: "",
    comment1: "",
    comment2: "",
    rating: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBook(id);
      if (book) {
        setFormData(book);  // Remplir le formulaire avec les données du livre
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Conversion des types pour éviter les erreurs
    const formattedData = {
      ...formData,
      yearRead: parseInt(formData.yearRead, 10), // Assurer que yearRead est bien un entier
      rating: formData.rating ? parseFloat(formData.rating) : null, // Gérer les notes vides
    };
  
    try {
      const updatedBook = await updateBook(id, formattedData);
      if (updatedBook) {
        alert("Livre mis à jour avec succès !");
        navigate(`/book/${id}`);
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h1>Modifier le Livre</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titre" required />
        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Auteur" required />
        <input type="number" name="yearRead" value={formData.yearRead} onChange={handleChange} placeholder="Année de lecture" required />
        <input type="text" name="series" value={formData.series} onChange={handleChange} placeholder="Série" />
        <input type="text" name="genre1" value={formData.genre1} onChange={handleChange} placeholder="Genre principal" required />
        <input type="text" name="genre2" value={formData.genre2} onChange={handleChange} placeholder="Genre secondaire" />
        <input type="text" name="subGenre" value={formData.subGenre} onChange={handleChange} placeholder="Sous-genre" />
        <input type="text" name="tag1" value={formData.tag1} onChange={handleChange} placeholder="Tag 1" />
        <input type="text" name="tag2" value={formData.tag2} onChange={handleChange} placeholder="Tag 2" />
        <input type="text" name="tag3" value={formData.tag3} onChange={handleChange} placeholder="Tag 3" />
        <textarea name="comment1" value={formData.comment1} onChange={handleChange} placeholder="Commentaire 1" />
        <textarea name="comment2" value={formData.comment2} onChange={handleChange} placeholder="Commentaire 2" />
        <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Note" />

        <button type="submit" style={styles.button}>💾 Enregistrer</button>
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
  button: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UpdateBook;
