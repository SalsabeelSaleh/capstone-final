import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import the context
import "./NextPage.css";

export default function NextPage() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const navigate = useNavigate();
    const { language, toggleLanguage } = useContext(AuthContext); // Using language and toggleLanguage from context

    useEffect(() => {
        const avatar = localStorage.getItem('selectedAvatar');
        if (avatar) {
            setSelectedAvatar(avatar);
        }
    }, []);

    return (
        <div className="next-page-container">
            <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
                <h1 className="login-title1">
                    {language === "en" ? "Abber" : "عَبِّرْ"}
                </h1>

                <button className="login-language-switch" onClick={toggleLanguage}>
                    {language === "en" ? "العربية" : "English"}
                </button>
            </header>

            <h1 className="page-title">
                {selectedAvatar
                    ? language === "en"
                        ? "Your Selected Avatar is"
                        : "الصورة الرمزية التي اخترتها هي"
                    : language === "en"
                    ? "Oops! No Avatar Selected!"
                    : "عذرًا! لم يتم اختيار صورة رمزية!"}
            </h1>

            {selectedAvatar ? (
                <div
                    className="avatar-display"
                    dangerouslySetInnerHTML={{ __html: selectedAvatar }}
                />
            ) : (
                <p>{language === "en" ? "No avatar selected." : "لم يتم اختيار صورة رمزية."}</p>
            )}

            {selectedAvatar && (
                <div className="celebration-message">
                    {language === "en"
                        ? "Great choice! 🎉 Your profile creation is completed! 🥳"
                        : " 🥳 ! اختيار رائع ! 🎉 لقد اكتمل إنشاء ملفك الشخصي "}
                </div>
            )}

            <button
                className="nextpage-continue-button"
                onClick={() => navigate("/main-page")}
            >
                {language === "en" ? "Continue" : "استمر"}
            </button>
        </div>
    );
}
