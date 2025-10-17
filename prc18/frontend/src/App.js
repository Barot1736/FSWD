import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    cookTime: '',
    difficulty: 'Easy'
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchRecipes();
        setFormData({ title: '', ingredients: '', instructions: '', cookTime: '', difficulty: 'Easy' });
        setShowForm(false);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/recipes/${id}`, { method: 'DELETE' });
      fetchRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🍳 Recipe Sharing Platform</h1>
        <p>Discover and share amazing recipes</p>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? '❌ Cancel' : '➕ Add Recipe'}
        </button>
      </header>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="recipe-form">
            <input
              type="text"
              placeholder="Recipe Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Ingredients (one per line)"
              value={formData.ingredients}
              onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
              required
            />
            <textarea
              placeholder="Instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Cook Time (e.g., 30 minutes)"
              value={formData.cookTime}
              onChange={(e) => setFormData({...formData, cookTime: e.target.value})}
              required
            />
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button type="submit" className="submit-btn">🚀 Share Recipe</button>
          </form>
        </div>
      )}

      <div className="recipes-container">
        {recipes.length === 0 ? (
          <div className="no-recipes">
            <h3>📭 No Recipes Yet</h3>
            <p>Be the first to share a delicious recipe!</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map(recipe => (
              <div key={recipe._id} className="recipe-card">
                <div className="recipe-header">
                  <h3>{recipe.title}</h3>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteRecipe(recipe._id)}
                  >
                    🗑️
                  </button>
                </div>
                <div className="recipe-meta">
                  <span className="cook-time">⏱️ {recipe.cookTime}</span>
                  <span className={`difficulty ${recipe.difficulty.toLowerCase()}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="recipe-content">
                  <h4>Ingredients:</h4>
                  <p className="ingredients">{recipe.ingredients}</p>
                  <h4>Instructions:</h4>
                  <p className="instructions">{recipe.instructions}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;