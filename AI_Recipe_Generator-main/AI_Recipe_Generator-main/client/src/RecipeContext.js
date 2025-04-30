// src/context/RecipeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
export const RecipeContext = createContext();

// Custom hook to use the context
export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  // Load saved recipes from localStorage on initial render
  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      const localData = localStorage.getItem('savedRecipes');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Error loading saved recipes from localStorage:', error);
      return [];
    }
  });

  // Update localStorage whenever savedRecipes changes
  useEffect(() => {
    try {
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      console.log('Saved recipes to localStorage:', savedRecipes);
    } catch (error) {
      console.error('Error saving recipes to localStorage:', error);
    }
  }, [savedRecipes]);

  // Function to add a new recipe to the saved recipes
  const saveRecipe = (recipe) => {
    setSavedRecipes((prevRecipes) => {
      // Check if a recipe with this ID already exists
      const exists = prevRecipes.some(r => r.id === recipe.id);
      if (exists) {
        return prevRecipes.map(r => r.id === recipe.id ? recipe : r);
      } else {
        return [...prevRecipes, recipe];
      }
    });
  };

  // Function to remove a recipe by ID
  const removeRecipe = (id) => {
    setSavedRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
  };

  // Provide the context value to children
  const value = {
    savedRecipes,
    saveRecipe,
    removeRecipe
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};