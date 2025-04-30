import React, { useState } from "react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.png"; // Import the image from src/assets

const RecipeCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ingredients: "",
    mealType: "",
    cuisine: "",
    cookingTime: "",
    complexity: "",
    people: "",
    note: "", // New note field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !formData.ingredients ||
      !formData.mealType ||
      !formData.cuisine ||
      !formData.cookingTime ||
      !formData.complexity ||
      !formData.people
    ) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Recipe Generator
      </h2>
      <div className="space-y-6">
        {[
          { label: "Ingredients", id: "ingredients", type: "text", placeholder: "e.g., chicken, rice" },
          { label: "Meal Type", id: "mealType", type: "select", options: ["Breakfast", "Lunch", "Dinner", "Snack"] },
          { label: "Cuisine", id: "cuisine", type: "text", placeholder: "e.g., Italian, Mexican" },
          { label: "Cooking Time", id: "cookingTime", type: "select", options: ["< 30 mins", "30-60 mins", "> 1 hour"] },
          { label: "Complexity", id: "complexity", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
          { label: "Number of People", id: "people", type: "number", placeholder: "e.g., 4" }
        ].map(({ label, id, type, options, placeholder }) => (
          <div key={id}>
            <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor={id}>
              {label}
            </label>
            {type === "select" ? (
              <select
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="note">
            Note (Optional)
          </label>
          <input
            id="note"
            type="text"
            placeholder="Any specific requirements (e.g., lactose-free)"
            value={formData.note}
            onChange={handleChange}
            className="w-full border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
        >
          Generate Recipe
        </button>
      </div>
    </div>
  );
};

const Hero = ({ onRecipeSubmit }) => {
  return (
    <section className="bg-gradient-to-r from-teal-50 to-indigo-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-0 md:py-10 lg:py-12">
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center rounded-full bg-blue-100 px-4 py-2">
              <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
              <p className="text-sm font-medium text-blue-800">Try Creative</p>
            </div>
            <p className="text-lg text-gray-600 sm:text-xl">
              A New Cooking Experience
            </p>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl lg:mb-8">
              with AI
            </h1>
            <p className="text-lg text-gray-600 sm:text-xl">
              Tired of cooking the same thing every day? Let AI inspire you with new,
              exciting recipes using what you already have. Discover easy, delicious meals from around the world
              and bring variety back to your table – all while learning about the nutrition in every dish.
            </p>
            <div className="mb-8 mt-8 h-px w-full bg-gray-200"></div>
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="flex justify-center"
            >
              <img
                src={heroImage}
                alt="Hero"
                className="w-[600px] h-auto rounded-xl"
              />
            </motion.div>
          </div>
          {/* Recipe Card Component */}
          <RecipeCard onSubmit={onRecipeSubmit} />
        </div>
      </div>
    </section>
  );
};

export default Hero;