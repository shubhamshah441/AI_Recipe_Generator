import React, { useState } from "react";

const RecipeForm = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState({
    ingredients: "",
    mealType: "",
    cuisine: "",
    cookingTime: "",
    complexity: "",
    people: "",
    note: "",
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
                disabled={isGenerating}
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
                disabled={isGenerating}
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
            disabled={isGenerating}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          disabled={isGenerating}
          className={`w-full ${
            isGenerating ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105`}
        >
          {isGenerating ? "Generating..." : "Generate Recipe"}
        </button>
      </div>
    </div>
  );
};

export default RecipeForm;