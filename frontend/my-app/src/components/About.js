import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";  // If you need navigation
import "./LoginPage.css"; // Reusing styles from LoginPage

export default function About() {
  const { language, toggleLanguage } = useContext(AuthContext);  // Access language context
  const navigate = useNavigate();  // To navigate between pages

  return (
    <div className="about-container">
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

      {/* About Section */}
      <h1 className="login-title">
        {language === "en" ? "About Us" : "عن النظام"}
      </h1>

      <p className="about-description">
        {language === "en" 
          ? "Our AI-driven tool helps children with autism understand facial expressions and emotions. It aims to make social interactions easier and more confident."
          : "أداة مدعومة بالذكاء الاصطناعي تساعد الأطفال المصابين بالتوحد على فهم تعابير الوجه والعواطف. تهدف إلى تسهيل التفاعلات الاجتماعية وجعلها أكثر ثقة."
        }
      </p>

      {/* Back to Home Button */}
      <button className="home-button primary" onClick={() => navigate("/main-page")}>
        {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
      </button>
    </div>
  );
}
