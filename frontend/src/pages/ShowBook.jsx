import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../services/api";

function ShowBook() {
  const { id } = useParams(); // Récupère l'ID du livre depuis l'URL
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const bookData = await getBook(id);
      setBook(bookData);
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <p style={{ color: "white", padding: "20px" }}>Chargement...</p>;
  }

  return (
    <div style={styles.container}>
      <h1>{book.title}</h1>
      <p><strong>Auteur :</strong> {book.author}</p>
      <p><strong>Année de lecture :</strong> {book.yearRead}</p>
      <p><strong>Série :</strong> {book.series || "N/A"}</p>
      <p><strong>Genre 1 :</strong> {book.genre1}</p>
      <p><strong>Genre 2 :</strong> {book.genre2 || "N/A"}</p>
      <p><strong>Sous-genre :</strong> {book.subGenre || "N/A"}</p>
      <p><strong>Tags :</strong> {[book.tag1, book.tag2, book.tag3].filter(Boolean).join(", ") || "N/A"}</p>
      <p><strong>Commentaires :</strong> {[book.comment1, book.comment2].filter(Boolean).join(" / ") || "Aucun"}</p>
      <p><strong>Note :</strong> {book.rating || "Non noté"}</p>

      <button style={styles.button} onClick={() => navigate(`/book/${id}/update`)}>✏️ Modifier</button>
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
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ShowBook;
