// src/components/Login.js
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, googleProvider, db } from "./firebase"; // Using relative path
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();

  // Get the return path if redirected from a protected route
  const from = location.state?.from?.pathname || "/dashboard";

  // Force redirect if user is already authenticated
  useEffect(() => {
    console.log("Auth state in Login:", { isAuthenticated, currentUser });
    
    if (isAuthenticated && currentUser) {
      console.log("User is authenticated, redirecting to:", from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      console.log(`Starting ${isSignUp ? 'signup' : 'login'} process`);
      
      if (isSignUp) {
        // Sign up flow
        if (!fname) {
          toast.error("First name is required");
          setIsProcessing(false);
          return;
        }
        
        console.log("Creating user account with email:", email);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log("User created successfully, saving to Firestore");
        // Create user document in Firestore
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname || "",
          photo: ""
        });
        
        toast.success("Account created successfully!");
        console.log("Account created successfully, redirecting to:", from);
        // The redirection will happen in the useEffect when auth state updates
      } else {
        // Login flow
        console.log("Logging in with email:", email);
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully");
        console.log("Login successful, redirecting to:", from);
        // The redirection will happen in the useEffect when auth state updates
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      toast.error(error.message);
      setIsProcessing(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      console.log("Starting Google sign-in process");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log("Google sign-in successful, saving user data");
      // Save user to Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName,
        lastName: "",
        photo: user.photoURL
      }, { merge: true });
      
      toast.success("Logged in with Google successfully!");
      console.log("Google login successful, redirect will happen in useEffect");
      // The redirection will happen in the useEffect when auth state updates
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      toast.error(error.message);
      setIsProcessing(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast.error("Please enter your registered email address");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // If already authenticated, show loading while redirect happens
  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-indigo-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-700">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-50 to-purple-50">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignUp ? "Create Account" : "Login"}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-gray-700">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your first name"
                  required
                  disabled={isProcessing}
                />
              </div>
              
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your last name"
                  disabled={isProcessing}
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-gray-700">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
              disabled={isProcessing}
            />
          </div>
          
          <div>
            <label className="block text-gray-700">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
              disabled={isProcessing}
            />
          </div>
          
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full ${
              isProcessing ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded-lg transition flex justify-center items-center`}
          >
            {isProcessing ? (
              <>
                <span className="mr-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                Processing...
              </>
            ) : (
              isSignUp ? "Sign Up" : "Login"
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          <span>OR</span>
        </div>
        
        <button
          onClick={handleGoogleSignIn}
          disabled={isProcessing}
          className={`w-full mt-4 ${
            isProcessing ? "bg-gray-100 cursor-not-allowed" : "bg-white hover:bg-gray-50"
          } border border-gray-300 text-gray-700 py-2 rounded-lg transition flex items-center justify-center`}
        >
          {isProcessing ? (
            <>
              <span className="mr-2">
                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </>
          )}
        </button>
        
        {!isSignUp && !isProcessing && (
          <button
            onClick={handleResetPassword}
            className="w-full mt-2 text-blue-600 py-2 text-sm hover:underline"
          >
            Forgot Password?
          </button>
        )}
        
        <div className="text-center mt-6">
          <p className="text-gray-700">
            {isSignUp ? "Already have an account?" : "Don't have an account?"} 
            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="ml-1 text-blue-600 hover:underline"
              disabled={isProcessing}
            >
              {isSignUp ? "Login" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;