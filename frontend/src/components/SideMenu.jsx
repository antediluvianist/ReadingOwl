import { useState, useEffect } from "react";

const defaultCategories = [
  { id: "default-1", name: "Toutes" },
  { id: "default-2", name: "Action" },
  { id: "default-3", name: "Aventure" },
  { id: "default-4", name: "SF" },
  { id: "default-5", name: "Horreur" },
  { id: "default-6", name: "Fantastique" },
  { id: "default-7", name: "Fantasy" },
  { id: "default-8", name: "Romance" },
  { id: "default-9", name: "Historique" },
];

function SideMenu({ onCategorySelect }) {
  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    const fetchCustomCategories = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/custom-categories");
        const data = await response.json();
        setCategories([...defaultCategories, ...data]);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories personnalisées :", error);
      }
    };

    fetchCustomCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    onCategorySelect(category.name);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() && !categories.some(cat => cat.name === newCategory.trim())) {
      try {
        const response = await fetch("http://localhost:8000/api/custom-categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory.trim() }),
        });

        if (response.ok) {
          const updatedResponse = await fetch("http://localhost:8000/api/custom-categories");
          const updatedData = await updatedResponse.json();

          setCategories([...defaultCategories, ...updatedData]);
          setNewCategory("");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie :", error);
      }
    }
  };

  const handleDeleteCategory = async (category) => {
    if (category.id.toString().startsWith("default-")) return;

    try {
      await fetch(`http://localhost:8000/api/custom-categories/${category.id}`, {
        method: "DELETE",
      });
      setCategories(categories.filter(cat => cat.id !== category.id));
      setSelectedCategory("Toutes");
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

  return (
    <div style={styles.sideMenu}>
      <h2>Genres</h2>
      <div style={styles.categoryList}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              ...styles.categoryItem,
              backgroundColor: selectedCategory === category.name ? "#55e77c" : "#111111",
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
            {selectedCategory === category.name && !category.id.toString().startsWith("default-") && (
              <button onClick={(e) => {
                e.stopPropagation(); // Empêche le clic de désélectionner la catégorie
                handleDeleteCategory(category);
              }} style={styles.deleteButton}>❌</button>
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
    backgroundColor: "#111111",
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
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#ff4d4d",
    cursor: "pointer",
    marginLeft: "10px",
  },
  addCategoryContainer: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "5px",
    borderRadius: "5px 0 0 5px",
    border: "0px solid #ccc",
    backgroundColor: "#1e1e1e",
    color: "white",
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: "#55e77c",
    color: "white",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
};

export default SideMenu;
