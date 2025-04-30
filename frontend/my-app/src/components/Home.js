import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(AuthContext);

  const buttons = [
    {
      path: "/create-account",
      label: language === "en" ? "Get Started" : "ابدأ ",
      primary: true,
    },
    {
      path: "/AboutHome",
      label: language === "en" ? "Learn More" : "تعرف أكثر",
      primary: false,
    },
  ];

  // Reverse the order of the buttons for Arabic
  const orderedButtons = language === "en" ? buttons : [...buttons].reverse();

  return (
    <div className="home-container">
      <header className="login-header">
        <h1 className="login-title1">{language === "en" ? "Abber" : "عَبِّرْ"}</h1>
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      <main className="home-main">
        <div className="home-content">
          <div className="home-text">
            <h1 className="home-welcome">
              {language === "en" ? "Welcome to Abber" : "مرحبًا بكم في عَبِّرْ"}
            </h1>

            <p className="home-description">
              {language === "en" ? (
                <>
                  <span className="home-line">EMPOWERING CHILDREN WITH</span> <br />
                  <span className="home-line">AUTISM THROUGH EMOTION</span> <br />
                  <span className="home-line">DETECTION TECHNOLOGY.</span>
                </>
              ) : (
                <>
                  <span className="home-line">تمكين الأطفال المصابين</span> <br />
                  <span className="home-line">بالتوحد من خلال تقنية</span> <br />
                  <span className="home-line">.اكتشاف العواطف</span>
                </>
              )}
            </p>

            <div className="home-buttons">
              {orderedButtons.map((button) => (
                <button
                  key={button.path}
                  className={`home-button ${button.primary ? "primary" : "secondary"}`}
                  onClick={() => navigate(button.path)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          <img
            src="/images/img1.png"
            alt={language === "en" ? "Emotion Detection Illustration" : "رسم توضيحي لاكتشاف العواطف"}
            className="home-image"
          />
        </div>
      </main>
    </div>
  );
}
