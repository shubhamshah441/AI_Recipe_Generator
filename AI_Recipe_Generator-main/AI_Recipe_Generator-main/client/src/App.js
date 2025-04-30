// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Dessert from "./components/Dessert";
import Popular from "./components/Popular";
import Saved from "./components/Saved";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";
import { RecipeProvider } from "./context/RecipeContext"; // Import RecipeProvider

// Styles
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <RecipeProvider> {/* Wrap with RecipeProvider */}
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/popular" element={<Popular />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/saved"
                  element={
                    <ProtectedRoute>
                      <Saved />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dessert"
                  element={
                    <ProtectedRoute>
                      <Dessert />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;