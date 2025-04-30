// src/components/RecipeDisplay.js
import React from "react";
import { jsPDF } from "jspdf";
import { useRecipeContext } from "../context/RecipeContext"; // Import the context hook

const RecipeDisplay = ({ error, recipeText }) => {
  const { saveRecipe } = useRecipeContext(); // Use the context

  const formatText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const recipeContent = recipeText.replace(/\*\*(.*?)\*\*/g, "$1");

    // Set up PDF content
    doc.setFontSize(16);
    doc.text("Generated Recipe", 10, 10);

    // Split the content into lines and add to PDF
    const lines = doc.splitTextToSize(recipeContent, 180);
    doc.setFontSize(12);
    doc.text(lines, 10, 20);

    // Save the PDF
    doc.save("Recipe.pdf");
  };

  const handleSaveRecipe = () => {
    // Extract recipe title from the content if possible
    let title = "Generated Recipe";
    const titleMatch = recipeText.match(/\*\*How to Make (.*?) -/);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }
    
    // Extract cooking time if possible
    let cookTime = "N/A";
    const timeMatch = recipeText.match(/Cooking Time: (.*?)(?:$|[\n\r]|-)/);
    if (timeMatch && timeMatch[1]) {
      cookTime = timeMatch[1].trim();
    }
    
    // Extract complexity if possible
    let complexity = "N/A";
    const complexityMatch = recipeText.match(/Complexity: (.*?)(?:$|[\n\r]|-)/);
    if (complexityMatch && complexityMatch[1]) {
      complexity = complexityMatch[1].trim();
    }

    // Extract serving size if possible
    let servings = "N/A";
    const servingsMatch = recipeText.match(/Serves: (.*?)(?:$|[\n\r]|-)/);
    if (servingsMatch && servingsMatch[1]) {
      servings = servingsMatch[1].trim();
    }

    // Extract cuisine type if possible
    let cuisineType = "Custom";
    const cuisineMatch = recipeText.match(/- (.*?) Style/);
    if (cuisineMatch && cuisineMatch[1]) {
      cuisineType = cuisineMatch[1].trim();
    }

    // Create a recipe object with more detailed information
    const recipe = {
      id: Date.now().toString(), // Use a string ID for consistency
      title: title,
      cookTime: cookTime,
      servings: servings,
      image: "/api/placeholder/300/200",
      category: cuisineType,
      complexity: complexity,
      description: recipeText.substring(0, 150) + "...", // Short preview
      content: recipeText,
      savedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: [cuisineType, complexity]
    };
    
    // Log before saving for debugging
    console.log("Saving recipe to context:", recipe);
    
    saveRecipe(recipe); // Save the recipe using the context
    alert("Recipe saved successfully!");
  };

  return (
    <section className="bg-gradient-to-r from-teal-50 to-indigo-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-0 md:py-10 lg:py-12">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {recipeText ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Generated Recipe</h2>
              <p
                className="whitespace-pre-line text-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: formatText(recipeText) }}
              />
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={generatePDF}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Download as PDF
                </button>
                <button
                  onClick={handleSaveRecipe}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Save Recipe
                </button>
              </div>
            </div>
          ) : (
            <p className="text-lg text-gray-600">No recipe available. Please submit your request above.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeDisplay;