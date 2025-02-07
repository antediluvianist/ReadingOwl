import { useState, useEffect } from "react";
import { addBook, searchBooks } from "../services/api";
import "./styles/AddBook.css";

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

  const defaultGenres = ["Action", "Aventure", "SF", "Horreur", "Fantastique", "Fantasy", "Romance", "Historique"];
  const [genres, setGenres] = useState(defaultGenres);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchCustomCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/custom-categories");
        const customCategories = await response.json();
        const customCategoryNames = customCategories.map(cat => cat.name);
        setGenres([...defaultGenres, ...customCategoryNames]);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories personnalisées :", error);
      }
    };
    fetchCustomCategories();
  }, []);

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
    const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "";
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
          headers: { "Content-Type": "application/json" },
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
    }
  };

  return (
    <div className="addbook">
      <h1>Ajouter un Livre</h1>
      <form onSubmit={handleSubmit} className="addbook-form">
        <input type="number" name="yearRead" placeholder="Année de lecture *" required onChange={handleChange} className="addbook-form__form-input" />
        <input type="text" name="title" placeholder="Titre *" required onChange={handleChange} className="addbook-form__form-input" />

        {suggestions.length > 0 && (
          <ul className="addbook-form__suggestions">
            {suggestions.map((book) => (
              <li key={book.key} onClick={() => handleSelectBook(book)} className="addbook-form__suggestion-item">
                <strong>{book.title}</strong> <br />
                <small>{book.author_name ? book.author_name.join(", ") : "Auteur inconnu"}</small>
              </li>
            ))}
          </ul>
        )}

        <input type="text" name="series" placeholder="Série" onChange={handleChange} className="addbook-form__form-input" />
        <select name="genre1" required onChange={handleChange} className="addbook-form__form-input">
          <option value="">Sélectionnez un genre *</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>
        <select name="genre2" onChange={handleChange} className="addbook-form__form-input">
          <option value="">Sélectionnez un second genre</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>

        <input type="text" name="subGenre" placeholder="Sous-genre" onChange={handleChange} className="addbook-form__form-input" />
        <textarea name="comment1" placeholder="Commentaire 1" onChange={handleChange} className="addbook-form__form-textarea"></textarea>
        <textarea name="comment2" placeholder="Commentaire 2" onChange={handleChange} className="addbook-form__form-textarea"></textarea>
        <input type="text" name="author" placeholder="Auteur *" required onChange={handleChange} value={formData.author} className="addbook-form__form-input" />
        <input type="number" name="rating" placeholder="Note" step="0.1" onChange={handleChange} className="addbook-form__form-input" />

        {formData.cover && (
          <img src={`http://localhost:8000${formData.cover}`} alt="Jaquette du livre" className="addbook-form__cover" />
        )}

        <button type="submit" className="addbook-form__submit-button">Ajouter</button>
      </form>
    </div>
  );
}

export default AddBook;
