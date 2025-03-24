import React, { createContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language is English

  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
  };

  return (
    <AuthContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </AuthContext.Provider>
  );
};
