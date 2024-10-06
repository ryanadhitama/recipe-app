import { useState } from 'react';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search for recipes based on a query
  const searchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/recipes/search?query=${query}`);
      const data = await response.json();
      setRecipes(data);
    } catch (err) {
      setError('Failed to fetch recipes.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch the recipe details based on an ID
  const fetchRecipeById = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/recipes/${id}`);
      const data = await response.json();
      setRecipeDetail(data);
    } catch (err) {
      setError('Failed to fetch recipe details.');
    } finally {
      setLoading(false);
    }
  };

  return {
    recipes,
    recipeDetail,
    loading,
    error,
    searchRecipes,
    fetchRecipeById,
  };
};
