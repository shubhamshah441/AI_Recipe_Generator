// src/components/Home.js
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "../assets/home.jpg";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-teal-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-16 px-5 md:px-0">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Content */}
            <div className="flex flex-col items-start gap-6">
              <div className="flex items-center rounded-full bg-blue-100 px-4 py-2">
                <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                <p className="text-sm font-medium text-blue-800">AI-Powered Cooking</p>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 md:text-6xl">
                Revolutionize Your Kitchen with AI
              </h1>
              <p className="text-lg text-gray-600 sm:text-xl">
                Discover delicious, personalized recipes using ingredients you already have. 
                Our AI assistant helps you create amazing meals with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link 
                  to="/login" 
                  className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all"
                >
                  Login
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.03 }}
              className="flex justify-center"
            >
              <img
                src={heroImage}
                alt="AI Recipe Generator"
                className="w-[90%] h-auto rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-5 md:px-0 bg-white">
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">Why Choose Our Recipe Generator?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform makes cooking exciting, creative, and accessible to everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>}
              title="Personalized Recommendations"
              description="Get recipes tailored to your preferences, dietary requirements, and available ingredients."
            />
            
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              title="Save Time"
              description="Instantly generate recipes without endless searching through cookbooks or websites."
            />
            
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>}
              title="Reduce Food Waste"
              description="Use what you already have in your kitchen to create delicious meals instead of letting ingredients go to waste."
            />
            
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.65" />
              </svg>}
              title="Explore Global Cuisines"
              description="Discover recipes from different cultures and broaden your culinary horizons."
            />
            
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>}
              title="Quick & Easy"
              description="Find recipes that match your available cooking time and skill level."
            />
            
            <FeatureCard 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>}
              title="Save Your Favorites"
              description="Create a personal collection of your favorite AI-generated recipes for easy access."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-5 md:px-0">
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Creating delicious recipes with our AI is quick and simple
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your free account to access all features</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Enter Ingredients</h3>
              <p className="text-gray-600">Tell us what ingredients you have and your preferences</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Recipes</h3>
              <p className="text-gray-600">Receive personalized recipe suggestions instantly</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all inline-block"
            >
              Start Creating Recipes Now
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-5 md:px-0 bg-blue-500 text-white">
        <div className="mx-auto w-full max-w-7xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl mb-6">Ready to Transform Your Cooking Experience?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of users who are discovering new recipes and reducing food waste with our AI recipe generator.
          </p>
          <Link 
            to="/login" 
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-all inline-block"
          >
            Get Started For Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;