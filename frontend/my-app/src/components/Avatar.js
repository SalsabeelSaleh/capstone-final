import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as Avatars from '@dicebear/avataaars';
import { createAvatar } from '@dicebear/core';
import "./Avatar.css";

export default function Avatar() {
    const { language } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isArabic, setIsArabic] = useState(false);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const toggleLanguage = () => {
        setIsArabic((prev) => !prev);
    };

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
        // Store the selected avatar in localStorage before navigating
        localStorage.setItem('selectedAvatar', selectedAvatar);
        navigate('/next-page');
    };

    return (
        <div className="avatar-container">
            <header className="login-header">
                <h1 className="login-title1">
                    {isArabic ? "عَبِّرْ" : "Abber"}
                </h1>
                <button className="login-language-switch" onClick={toggleLanguage}>
                    {isArabic ? "English" : "العربية"}
                </button>
            </header>

            <div className="avatar-title-container">
                <h1 className="avatar-title">
                    {isArabic
                        ? "😊 هل أنت مستعد لاختيار صورتك الرمزية؟"
                        : "Ready to choose your avatar? 😊"}
                </h1>
            </div>

            <div className="avatar-instruction">
                {isArabic ? " 👇 من فضلك اختر صورتك الرمزية " : "Kindly select your avatar 👇"}
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
                    {isArabic ? "تجديد الصور الرمزية" : "Regenerate Avatars"}
                </button>

                <button
                    className="continue-button"
                    onClick={handleContinue}
                    disabled={!selectedAvatar}
                >
                    {isArabic ? "استمرار" : "Continue"}
                </button>
            </div>

            <div className="buttons-container">
                <button className="avatar-button primary" onClick={() => navigate("/")}>
                    {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
                </button>
                <button className="avatar-button secondary" onClick={() => navigate("/create-account")}>
                    {isArabic ? "العودة إلى إنشاء الحساب" : "Back to Create Account"}
                </button>
            </div>
        </div>
    );
}
