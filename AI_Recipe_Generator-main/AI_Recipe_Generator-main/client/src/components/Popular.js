// src/components/Popular.js
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="h-48 bg-blue-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-gray-600">{recipe.rating}</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {recipe.time}
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {recipe.cuisineType}
          </div>
        </div>
        <p className="mt-3 text-gray-600 line-clamp-2">{recipe.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <button className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition">
            View Recipe
          </button>
          <button className="text-gray-500 hover:text-red-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Popular = () => {
  // Sample data - replace with actual API call or data fetching logic later
  const [popularRecipes] = useState([
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      description: "A delicious pasta dish with a creamy garlic sauce that's quick to make and perfect for weeknight dinners.",
      rating: 4.8,
      time: "30 mins",
      cuisineType: "Italian",
    },
    {
      id: 2,
      title: "Spicy Thai Curry",
      description: "Authentic Thai red curry with vegetables and your choice of protein. Perfect balance of spicy, sweet, and savory flavors.",
      rating: 4.7,
      time: "45 mins",
      cuisineType: "Thai",
    },
    {
      id: 3,
      title: "Classic Beef Burger",
      description: "Juicy homemade beef burger with all the fixings. Learn the secrets to making the perfect patty every time.",
      rating: 4.9,
      time: "25 mins",
      cuisineType: "American",
    },
    {
      id: 4,
      title: "Vegetable Biryani",
      description: "Aromatic Indian rice dish with mixed vegetables and fragrant spices. A complete meal in itself.",
      rating: 4.6,
      time: "50 mins",
      cuisineType: "Indian",
    },
    {
      id: 5,
      title: "Chocolate Lava Cake",
      description: "Decadent chocolate dessert with a gooey molten center. Surprisingly easy to make and always impressive.",
      rating: 4.9,
      time: "20 mins",
      cuisineType: "Dessert",
    },
    {
      id: 6,
      title: "Greek Salad",
      description: "Fresh and healthy Mediterranean salad with cucumbers, tomatoes, olives, and feta cheese.",
      rating: 4.5,
      time: "15 mins",
      cuisineType: "Greek",
    },
  ]);

  // Filter options - to be implemented later
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');

  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Popular Recipes</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our community's favorite recipes
          </p>
        </div>

        {/* Filters section - to be fully implemented later */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Cuisine:</span>
              <select 
                className="border rounded-md px-3 py-1.5"
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Italian">Italian</option>
                <option value="Thai">Thai</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="Greek">Greek</option>
              </select>
            </div>

            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Sort by:</span>
              <select 
                className="border rounded-md px-3 py-1.5"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="cookingTime">Cooking Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recipe grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {/* Call-to-action for non-authenticated users */}
        {!isAuthenticated && (
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Create Your Own Recipes!</h3>
            <p className="text-blue-600 mb-4">
              Sign up to generate personalized recipes and save your favorites.
            </p>
            <a 
              href="/login" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popular;