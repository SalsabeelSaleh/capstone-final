import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";  // To navigate between pages
import "./LoginPage.css"; // Reusing styles from LoginPage

export default function Help() {
  const { language, toggleLanguage } = useContext(AuthContext);  // Access language context
  const navigate = useNavigate();  // To navigate between pages

  return (
    <div className="help-container">
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

      {/* Help Section */}
      <h1 className="login-title">
        {language === "en" ? "Help & Support" : "المساعدة والدعم"}
      </h1>

      <p className="help-description">
        {language === "en"
          ? "If you have any questions or need assistance, feel free to reach out to us. We're here to help you with any technical issues or inquiries about the system."
          : "إذا كان لديك أي أسئلة أو تحتاج إلى المساعدة، لا تتردد في الاتصال بنا. نحن هنا لمساعدتك في أي مشاكل فنية أو استفسارات حول النظام."}
      </p>

      {/* Back to Home Button */}
      <button className="home-button primary" onClick={() => navigate("/main-page")}>
        {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
      </button>
    </div>
  );
}
