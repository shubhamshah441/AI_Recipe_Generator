import React, { useState, useRef } from "react";
import DessertForm from "./DessertForm"; // Import DessertForm
import DessertDisplay from "./DessertDisplay"; // Import DessertDisplay
import { motion } from "framer-motion";
import dessertImage from "../assets/dessert.png"; // Import dessert image

const Dessert = () => {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const eventSourceRef = useRef(null);
  const recipeDisplayRef = useRef(null);

  const closeEventStream = () => {
    if (eventSourceRef.current) eventSourceRef.current.close();
    setIsGenerating(false);
  };

  const initializeEventStream = (data) => {
    const queryParams = new URLSearchParams(data).toString();
    const url = `https://recipegenerator-n26b.onrender.com/recipeStream?${queryParams}`;
    
    eventSourceRef.current = new EventSource(url);
    setIsGenerating(true);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === "close") {
        closeEventStream();
      } else if (data.chunk) {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error("Error:", error);
      setError("Connection issue. Please try again.");
      closeEventStream();
    };
  };

  const handleRecipeSubmit = (data) => {
    setRecipeData(data);
    setRecipeText("");
    setError(null);
    
    // Close any existing event stream
    closeEventStream();
    
    // Initialize new event stream
    initializeEventStream(data);
    
    // Scroll to recipe display if it exists
    if (recipeDisplayRef.current) {
      setTimeout(() => {
        recipeDisplayRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-5 py-6 md:px-0 md:py-10 lg:py-12">
        <div className="grid gap-12 sm:gap-20 lg:grid-cols-2">
          {/* Content Section */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center rounded-full bg-pink-100 px-4 py-2">
              <div className="mr-2 h-2 w-2 rounded-full bg-pink-600"></div>
              <p className="text-sm font-medium text-pink-800">Your Dessert Dashboard</p>
            </div>
            <p className="text-lg text-gray-600 sm:text-xl">
              A Sweet Culinary Adventure
            </p>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl lg:mb-8">
              with AI
            </h1>
            <p className="text-lg text-gray-600 sm:text-xl">
              Craving something sweet? Let AI inspire you with delightful dessert recipes using ingredients you already have. From cakes to cookies, discover easy-to-make treats that will satisfy your sweet tooth and impress your guests.
            </p>
            <div className="mb-8 mt-8 h-px w-full bg-gray-200"></div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="flex justify-center"
            >
              <img
                src={dessertImage} // Use the imported image
                alt="Dessert Hero"
                className="w-[600px] h-auto rounded-xl"
              />
            </motion.div>
          </div>

          {/* Recipe Form Section */}
          <div className="lg:col-span-1">
            <DessertForm onSubmit={handleRecipeSubmit} isGenerating={isGenerating} />
          </div>
        </div>

        {/* Recipe Display Section */}
        <div 
          className="mt-12"
          ref={recipeDisplayRef}
        >
          {isGenerating && !recipeText && (
            <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500 mb-4"></div>
                <p className="text-gray-600">Generating your dessert recipe...</p>
              </div>
            </div>
          )}
          
          {(recipeText || error) && (
            <DessertDisplay error={error} recipeText={recipeText} />
          )}
          
          {!isGenerating && !recipeText && !error && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg 
                className="mx-auto h-16 w-16 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No dessert recipe generated yet</h3>
              <p className="mt-2 text-sm text-gray-500">
                Fill out the form to generate a personalized dessert recipe
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dessert;