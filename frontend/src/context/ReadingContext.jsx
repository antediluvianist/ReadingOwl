import { createContext, useState } from "react";

// Création du contexte
export const ReadingContext = createContext();

export function ReadingProvider({ children }) {
  const [books, setBooks] = useState([]);

  // Fonction pour ajouter un livre
  const addBook = (title) => {
    setBooks([...books, { id: books.length + 1, title }]);
  };

  return (
    <ReadingContext.Provider value={{ books, addBook }}>
      {children}
    </ReadingContext.Provider>
  );
}
