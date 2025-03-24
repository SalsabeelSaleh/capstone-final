import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css"; // Import styles
import { loginUser } from "../api"; // added by s

export default function LoginPage() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.username && formData.password) {
      //added by s from here...
      try {
        const result = await loginUser(formData); // ✅ Call backend API
    
        if (result.error) {
            alert(result.error); // ✅ Show error if login fails
            return;
        }
    
        localStorage.setItem("user", JSON.stringify(result.user)); // ✅ Store user
    } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
    }
//till here    
      console.log("Logged in successfully:", formData);
      navigate("/main-page"); // Navigate to MainPage after successful login
    } else {
      alert("Please fill in all fields!");
    }
  };

  // 🔹 Form Fields Array (Reverse Order in Arabic)
  const formFields = [
    { label: "Username:", labelAr: "اسم المستخدم:", name: "username", type: "text" },
    { label: "Password:", labelAr: "كلمة المرور:", name: "password", type: "password" },
  ];

  // 🔹 Reverse order for Arabic
  const orderedFields = language === "en" ? formFields : [...formFields].reverse();

  return (
    <div className="login-container">
      <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
        <h1 className="login-title1">
          {language === "en" ? "Abber" : "عَبِّرْ"}
        </h1>

        {/* 🔹 Language Switch Button */}
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      <h1 className="login-title">
        {language === "en" ? "Welcome Back! Login 😊" : " 😊 مرحبًا بعودتك! تسجيل الدخول "}
      </h1>

      <form
        className="login-form"
        onSubmit={handleSubmit}
        dir={language === "en" ? "ltr" : "rtl"} // Adjust direction
      >
        {orderedFields.map((field) => (
          <label key={field.name} className="form-label">
            {language === "en" ? field.label : field.labelAr}
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </label>
        ))}

        <button type="submit" className="login-button">
          {language === "en" ? "Login" : "تسجيل الدخول"}
        </button>
      </form>

      {/* 🔹 "Don't Have an Account?" */}
      <p className="create-account-text" onClick={() => navigate("/create-account")}>
        {language === "en" ? "Don't have an account? Create one" : "ليس لديك حساب؟ قم بإنشاء واحد"}
      </p>

      {/* 🔹 Back to Home Button */}
      <button className="home-button primary" onClick={() => navigate("/")}>
        {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
      </button>
    </div>
  );
}
