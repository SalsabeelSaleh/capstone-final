import React, { useContext } from "react";
import { useState } from "react";// added by s
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css"; // Reusing styles from LoginPage
import { getUserProfile } from "../api";// added by s

export default function Profile() {
  const { language, toggleLanguage } = useContext(AuthContext);
  const navigate = useNavigate();  // To navigate between pages
  
  //added by s from here..
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  //till here

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
        <h1 className="login-title1">
          {language === "en" ? "Abber" : "عَبِّرْ"}
        </h1>

        {/* Language Switch Button */}
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      {/* Profile Section */}
      <h1 className="login-title">
        {language === "en" ? "Welcome to Your Profile 😊" : " 😊 مرحبًا بك في ملفك الشخصي"}
      </h1>

      

      {/* Back to Home Button */}
      <button className="home-button primary" onClick={() => navigate("/main-page")}>
        {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
      </button>
    </div>
  );
}
