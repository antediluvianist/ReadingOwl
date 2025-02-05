import { useState, useEffect } from "react";

const defaultCategories = ["Toutes", "Action", "Aventure", "SF", "Horreur", "Fantastique", "Fantasy", "Romance", "Historique"];

function SideMenu({ onCategorySelect }) {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("customCategories");
    return savedCategories ? [...defaultCategories, ...JSON.parse(savedCategories)] : defaultCategories;
  });

  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const customCategories = categories.filter(cat => !defaultCategories.includes(cat));
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [categories]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category) => {
    setCategories(categories.filter(cat => cat !== category));
    if (selectedCategory === category) {
      setSelectedCategory("Toutes");
      onCategorySelect("Toutes");
    }
  };

  return (
    <div style={styles.sideMenu}>
      <h2>Genres</h2>
      <div style={styles.categoryList}>
        {categories.map((category) => (
          <div
            key={category}
            style={{
              ...styles.categoryItem,
              backgroundColor: selectedCategory === category ? "#4caf50" : "#1e1e1e",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onClick={() => handleCategoryClick(category)}
          >
            <span>{category}</span>
            {!defaultCategories.includes(category) && selectedCategory === category && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory(category);
                }}
                style={styles.deleteButton}
              >
                ✖
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={styles.addCategoryContainer}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Ajouter une catégorie"
          style={styles.input}
        />
        <button onClick={handleAddCategory} style={styles.addButton}>+</button>
      </div>
    </div>
  );
}

const styles = {
  sideMenu: {
    width: "200px",
    backgroundColor: "#1e1e1e",
    color: "white",
    padding: "10px",
    overflowY: "auto",
    maxHeight: "100vh",
  },
  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  categoryItem: {
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    position: "relative",
  },
  addCategoryContainer: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "5px",
    borderRadius: "5px 0 0 5px",
    border: "1px solid #ccc",
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "red",
    border: "none",
    color: "white",
    padding: "2px 5px",
    borderRadius: "3px",
    cursor: "pointer",
    marginLeft: "5px",
  },
};

export default SideMenu;
