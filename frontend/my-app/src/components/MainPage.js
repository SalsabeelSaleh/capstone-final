import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Animation library
import { AuthContext } from "../context/AuthContext";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useContext(AuthContext);

  // State for toggling the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility when hamburger icon is clicked
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Handle navigation when clicking menu items
  const handleNavigation = (path) => {
    navigate(path);  // Navigate to the given path
  };

  const navItems = [
    { path: "/main-page", label: language === "en" ? "Home" : "الرئيسية" },
    { path: "/profile", label: language === "en" ? "Profile" : "الملف الشخصي" },
    { path: "/emotion-detection", label: language === "en" ? "Emotion Detection" : "اكتشاف العواطف" },
    { path: "/about", label: language === "en" ? "About" : "عن النظام" },
    { path: "/help", label: language === "en" ? "Help" : "مساعدة" },
    { path: "/", label: language === "en" ? "Log Out" : "تسجيل الخروج" }
  ];

  // Reverse the order of the nav items for Arabic
  const orderedNavItems = language === "en" ? navItems : [...navItems].reverse();

  return (
    <div className="mainpage-container">
      <header className="login-header">
        <h1 className="login-title1">
          {language === "en" ? "Abber" : "عَبِّرْ"}
        </h1>

        {/* Main Nav Bar (visible on larger screens) */}
        <nav className="mainpage-nav">
          {orderedNavItems.map((item) => (
            <a
              key={item.path}
              href="#"
              className="mainpage-link"
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </a>
          ))}

          {/* Hamburger Icon */}
          <button className="hamburger-icon" onClick={toggleMenu}>
            &#9776; {/* Hamburger icon */}
          </button>

          {/* Language switch button */}
          <button className="login-language-switch" onClick={toggleLanguage}>
            {language === "en" ? "العربية" : "English"}
          </button>
        </nav>
      </header>

      {/* Hamburger Dropdown Menu (visible only when the menu is open) */}
      <nav className={`mainpage-nav-dropdown ${isMenuOpen ? "open" : ""}`}>
        {orderedNavItems.map((item) => (
          <a
            key={item.path}
            href="#"
            className="mainpage-link"
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {language === "en"
            ? "Helping Children Understand Emotions"
            : "مساعدة الأطفال على فهم العواطف"}
        </motion.h1>
        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {language === "en"
            ? "An AI-powered tool designed to assist children with autism in recognizing facial emotions. It provides real-time emotion detection, allowing children to understand expressions better and interact more confidently."
            : " أداة مدعومة بالذكاء الاصطناعي لمساعدة الأطفال المصابين بالتوحد في التعرف على العواطف. توفر تقنية اكتشاف المشاعر في الوقت الفعلي، مما يساعد الأطفال على فهم التعابير بشكل أفضل والتفاعل بثقة"}
        </motion.p>

        <motion.button
          className="hero-button"
          onClick={() => navigate("/emotion-detection")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === "en" ? "Start Detecting Emotions !" : " ! ابدأ في اكتشاف العواطف "}
        </motion.button>
      </section>

      {/* Interactive Emotion Cards */}
      {/* Interactive Emotion Cards */}
<section className="emotion-cards">
  <motion.div
    className="emotion-card"
    whileHover={{ scale: 1.1 }}
  >
    <p>{language === "en" ? "Happy" : "سعيد"}</p>
    <img src="/images/happy.jpg" alt="Happy" />
  </motion.div>

  <motion.div
    className="emotion-card"
    whileHover={{ scale: 1.1 }}
  >
    <p>{language === "en" ? "Sad" : "حزين"}</p>
    <img src="/images/sad.jpg" alt="Sad" />
  </motion.div>

  <motion.div
    className="emotion-card"
    whileHover={{ scale: 1.1 }}
  >
    <p>{language === "en" ? "Surprised" : "مندهش"}</p>
    <img src="/images/surprised.jpg" alt="Surprised" />
  </motion.div>

  <motion.div
    className="emotion-card"
    whileHover={{ scale: 1.1 }}
  >
    <p>{language === "en" ? "Angry" : "غاضب"}</p>
    <img src="/images/angry.jpg" alt="Angry" />
  </motion.div>

  <motion.div
    className="emotion-card"
    whileHover={{ scale: 1.1 }}
  >
    <p>{language === "en" ? "Confused" : "مرتبك"}</p>
    <img src="/images/confused.jpg" alt="Confused" />
  </motion.div>
</section>


      {/* About Emotions Section */}
      <section className="about-emotions">
        <motion.h2
          className="about-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {language === "en" ? "Why Emotion Detection?" : "لماذا اكتشاف العواطف؟"}
        </motion.h2>
        <motion.p
          className="about-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {language === "en"
            ? "Children with autism often struggle with recognizing facial expressions, making social interactions challenging. Our AI-driven tool helps bridge this gap, enabling them to better understand emotions in a fun and engaging way."
            : ".يواجه الأطفال المصابون بالتوحد صعوبة في التعرف على تعابير الوجه، مما يجعل التفاعل الاجتماعي أكثر تحديًا. تساعد أداتنا المدعومة بالذكاء الاصطناعي في سد هذه الفجوة، مما يمكنهم من فهم العواطف بطريقة ممتعة وتفاعلية"}
        </motion.p>

        {/* Learn More Button */}
        <motion.button
          className="learn-more-button"
          onClick={() => navigate("/AboutMain")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === "en" ? "Learn More" : "اعرف المزيد"}
        </motion.button>
      </section>
    </div>
  );
}
