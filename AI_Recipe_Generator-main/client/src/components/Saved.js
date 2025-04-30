// src/components/Saved.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRecipeContext } from "../context/RecipeContext"; // Import the recipe context
import { useNavigate } from "react-router-dom";

const SavedRecipeCard = ({ recipe, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="p-5">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
          <div className="flex space-x-2">
            <button 
              className="text-gray-500 hover:text-blue-600 transition"
              title="View Recipe"
              onClick={() => setExpanded(!expanded)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button 
              onClick={() => {
                console.log('Delete clicked for recipe ID:', recipe.id);
                onDelete(recipe.id);
              }}
              className="text-gray-500 hover:text-red-600 transition"
              title="Remove from Saved"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-gray-600">
          {recipe.cookTime && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{recipe.cookTime}</span>
            </div>
          )}
          
          {recipe.category && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{recipe.category}</span>
            </div>
          )}
          
          {recipe.savedDate && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Saved on {recipe.savedDate}</span>
            </div>
          )}
        </div>
        
        {!expanded ? (
          <p className="mt-3 text-gray-600 line-clamp-2">{recipe.description || recipe.content.substring(0, 150) + "..."}</p>
        ) : (
          <div className="mt-3">
            <div 
              className="whitespace-pre-line text-gray-700 border-l-4 border-blue-100 pl-4 py-2"
              dangerouslySetInnerHTML={{ __html: recipe.content ? recipe.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") : "" }}
            />
            <button 
              onClick={() => setExpanded(false)}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Show Less
            </button>
          </div>
        )}
        
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const EmptySavedState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">No saved recipes yet</h3>
      <p className="mt-1 text-sm text-gray-500">
        Your saved recipes will appear here
      </p>
      <div className="mt-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate a Recipe
        </button>
      </div>
    </div>
  );
};

const Saved = () => {
  const { isAuthenticated } = useAuth();
  const { savedRecipes, removeRecipe } = useRecipeContext(); // Use savedRecipes from context
  const navigate = useNavigate();
  
  // State to force re-render when items are deleted
  const [, setForceUpdate] = useState(0);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');

  // Filtered recipes
  const filteredRecipes = savedRecipes.filter(recipe => 
    recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle recipe deletion - modified for better debugging
  const handleDeleteRecipe = (id) => {
    console.log('handleDeleteRecipe called with ID:', id);
    
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      console.log('Confirmation approved, calling removeRecipe');
      removeRecipe(id);
      
      // Force a re-render
      setForceUpdate(prev => prev + 1);
      
      // Show confirmation to user
      console.log('Recipe deleted successfully');
    }
  };

  console.log('Current savedRecipes:', savedRecipes);
  console.log('Filtered recipes:', filteredRecipes);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Saved Recipes</h1>
          {savedRecipes.length > 0 && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search saved recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          )}
        </div>

        {savedRecipes.length === 0 ? (
          <EmptySavedState />
        ) : (
          <>
            {searchTerm && filteredRecipes.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No recipes match your search.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                  <SavedRecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onDelete={handleDeleteRecipe} 
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Saved;