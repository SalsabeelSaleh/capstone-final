import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Reusing styles from LoginPage
import "./About.css"; // Importing the About page specific styles

export default function About() {
  const { language, toggleLanguage } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className={language === "ar" ? "rtl" : "ltr"}>
      {/* Header Section outside the scrollable container */}
      <header className={`login-header ${language === "ar" ? "rtl" : "ltr"}`}>
        <h1 className="login-title1">
          {language === "en" ? "Abber" : "عَبِّرْ"}
        </h1>

        {/* Language Switch Button */}
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      {/* About Section */}
      <div className="about-container">
        <div className="about-content" style={{ textAlign: language === "ar" ? "right" : "left", direction: language === "ar" ? "rtl" : "ltr" }}>
          <h1 className="about-title">
            {language === "en" ? "About Us" : "عن النظام"}
          </h1>

          <section className="about-section">
            <h2>{language === "en" ? "Our Mission" : "مهمتنا"}</h2>
            <p>
              {language === "en"
                ? "We aim to support children with autism in understanding and recognizing emotions through an AI-powered Facial Emotion Detection System. Our goal is to improve their communication and social interaction skills by providing real-time feedback on facial expressions."
                : "نهدف إلى دعم الأطفال المصابين بالتوحد في فهم والتعرف على العواطف من خلال نظام كشف المشاعر بالذكاء الاصطناعي. هدفنا هو تحسين مهاراتهم في التواصل والتفاعل الاجتماعي من خلال تقديم ملاحظات فورية حول تعابير الوجه."}
            </p>
          </section>

          <section className="about-section">
            <h2>{language === "en" ? "What We Do" : "ما نقوم به"}</h2>
            <p>
              {language === "en"
                ? "Our web-based system uses AI, machine learning, and computer vision to analyze facial emotions and provide instant feedback in an interactive and user-friendly way."
                : "يستخدم نظامنا المستند إلى الويب الذكاء الاصطناعي والتعلم الآلي ورؤية الكمبيوتر لتحليل المشاعر الوجهية وتقديم ملاحظات فورية بطريقة تفاعلية وسهلة الاستخدام."}
            </p>
          </section>

          <section className="about-section">
            <h2>{language === "en" ? "Why It Matters" : "لماذا هذا مهم؟"}</h2>
            <ul style={{ textAlign: language === "ar" ? "right" : "left", direction: language === "ar" ? "rtl" : "ltr" }}>
              <li>{language === "en" ? "Real-time emotion analysis to help children understand facial expressions." : "تحليل المشاعر في الوقت الحقيقي لمساعدة الأطفال على فهم تعابير الوجه."}</li>
              <li>{language === "en" ? "A friendly and interactive interface designed for ease of use." : "واجهة تفاعلية وسهلة الاستخدام."}</li>
              <li>{language === "en" ? "Personalized features that adapt to different users’ needs." : "ميزات مخصصة تتكيف مع احتياجات المستخدمين المختلفين."}</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>{language === "en" ? "How It Works" : "كيف يعمل؟"}</h2>
            <ol style={{ textAlign: language === "ar" ? "right" : "left", direction: language === "ar" ? "rtl" : "ltr" }}>
              <li>{language === "en" ? "The child or parent opens the web app." : "يفتح الطفل أو الوالد التطبيق."}</li>
              <li>{language === "en" ? "The camera detects and analyzes facial expressions using AI." : "تكتشف الكاميرا وتحلل تعابير الوجه باستخدام الذكاء الاصطناعي."}</li>
              <li>{language === "en" ? "The system displays real-time feedback with text and emojis." : "يعرض النظام ملاحظات فورية مع نصوص ورموز تعبيرية."}</li>
              <li>{language === "en" ? "The child learns to associate emotions with expressions, improving social understanding." : "يتعلم الطفل ربط العواطف بالتعابير، مما يحسن الفهم الاجتماعي."}</li>
            </ol>
          </section>

          <section className="about-section">
            <h2>{language === "en" ? "Join Us in Making a Difference!" : "انضم إلينا في صنع الفرق!"}</h2>
            <p>
              {language === "en"
                ? "We are dedicated to using technology to support children with autism in their emotional and social development. Whether you’re a parent, educator, or researcher, our platform offers an innovative way to foster emotional learning."
                : "نحن ملتزمون باستخدام التكنولوجيا لدعم الأطفال المصابين بالتوحد في تطورهم العاطفي والاجتماعي. سواء كنت والدًا، معلمًا، أو باحثًا، فإن منصتنا تقدم طريقة مبتكرة لتعزيز التعلم العاطفي."}
            </p>
          </section>
        </div>

        {/* Back to Home Button */}
        <button className="home-button primary" onClick={() => navigate("/main-page")}>
          {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
        </button>
      </div>
    </div>
  );
}
