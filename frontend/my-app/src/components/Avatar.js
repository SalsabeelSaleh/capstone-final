import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as Avatars from '@dicebear/avataaars';
import { createAvatar } from '@dicebear/core';
import "./Avatar.css";

export default function Avatar() {
    const { language, toggleLanguage } = useContext(AuthContext); // Use global language
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const generateAvatars = () => {
        const newAvatars = [];
        for (let i = 0; i < 6; i++) {
            const svg = createAvatar(Avatars, {
                seed: Math.random().toString(36).substring(7),
                backgroundColor: '#ffffff',
                width: 200,
                height: 200,
            });
            newAvatars.push(svg);
        }
        setAvatars(newAvatars);
    };

    useEffect(() => {
        generateAvatars();
    }, []);

    const handleAvatarSelect = (index) => {
        setSelectedAvatar(avatars[index]);
    };

    const regenerateAvatars = () => {
        generateAvatars();
        setSelectedAvatar(null);
    };

    const handleContinue = () => {
        localStorage.setItem('selectedAvatar', selectedAvatar);
        navigate('/next-page');
    };

    return (
        <div className="avatar-container">
            <header className="login-header">
                <h1 className="login-title1">
                    {language === "ar" ? "عَبِّرْ" : "Abber"}
                </h1>
                <button className="login-language-switch" onClick={toggleLanguage}>
                    {language === "ar" ? "English" : "العربية"}
                </button>
            </header>

            <div className="avatar-title-container">
                <h1 className="avatar-title">
                    {language === "ar"
                        ? "😊 هل أنت مستعد لاختيار صورتك الرمزية؟"
                        : "Ready to choose your avatar? 😊"}
                </h1>
            </div>

            <div className="avatar-instruction">
                {language === "ar" ? " 👇 من فضلك اختر صورتك الرمزية " : "Kindly select your avatar 👇"}
            </div>

            <div className="avatar-collection-container">
                {avatars.length > 0 && (
                    <div className="avatar-collection">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar-item ${selectedAvatar === avatar ? 'selected' : ''}`}
                                onClick={() => handleAvatarSelect(index)}
                                dangerouslySetInnerHTML={{ __html: avatar }}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="buttons-container-horizontal">
                <button className="avatar-button-regenerate" onClick={regenerateAvatars}>
                    {language === "ar" ? "تجديد الصور الرمزية" : "Regenerate Avatars"}
                </button>

                <button
                    className="continue-button"
                    onClick={handleContinue}
                    disabled={!selectedAvatar}
                >
                    {language === "ar" ? "استمرار" : "Continue"}
                </button>
            </div>

            <div className="buttons-container">
                <button className="avatar-button primary" onClick={() => navigate("/")}>
                    {language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
                </button>
                <button className="avatar-button secondary" onClick={() => navigate("/create-account")}>
                    {language === "ar" ? "العودة إلى إنشاء الحساب" : "Back to Create Account"}
                </button>
            </div>
        </div>
    );
}

