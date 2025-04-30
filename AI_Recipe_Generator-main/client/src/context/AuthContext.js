// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../components/firebase"; // Using correct path to firebase.js
import { 
  onAuthStateChanged, 
  signOut as authSignOut 
} from "firebase/auth";

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user ? `User ${user.email} logged in` : "No user");
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Sign out function
  const signOut = async () => {
    console.log("Signing out user");
    setLoading(true);
    try {
      await authSignOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    signOut,
    isAuthenticated: !!currentUser,
    loading
  };

  console.log("Auth context state:", { isAuthenticated: !!currentUser, loading });

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};