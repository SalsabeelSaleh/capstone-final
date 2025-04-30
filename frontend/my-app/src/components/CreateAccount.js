import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "./CreateAccount.css";

function CreateAccount() {
    const navigate = useNavigate();
    const { language, toggleLanguage } = useContext(AuthContext); // Use global language state

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate and submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = { username: "", email: "", password: "", confirmPassword: "" };

        if (!formData.username) {
            newErrors.username = language === "ar" ? "الرجاء إدخال اسم المستخدم" : "Please enter a username";
        }
        if (!formData.email) {
            newErrors.email = language === "ar" ? "الرجاء إدخال البريد الإلكتروني" : "Please enter an email";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = language === "ar" ? "البريد الإلكتروني غير صالح" : "Invalid email format";
        }
        if (!formData.password) {
            newErrors.password = language === "ar" ? "الرجاء إدخال كلمة المرور" : "Please enter a password";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
        }

        setErrors(newErrors);

        if (!newErrors.username && !newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
            navigate("/avatar");
        }
    };

    return (
        <div className={`create-account-container ${language === "ar" ? "rtl" : ""}`}>
            <header className="create-account-header">
                <h1 className="create-account-title1">{language === "ar" ? "عَبِّرْ" : "Abber"}</h1>

                <button className="create-acc-language-switch" onClick={toggleLanguage}>
                    {language === "ar" ? "English" : "العربية"}
                </button>
            </header>       
            
            <h1 className="create-account-title">
                {language === "ar" 
                    ? "😊 أهلاً بك! لننشئ حسابك معًا "  
                    : "Let's Create Your Account Together 😊"}
            </h1>

            <div className="form-wrapper">
                <form className={`create-account-form ${language === "ar" ? "rtl" : ""}`} onSubmit={handleSubmit}>
                    <label className="form-label">
                        {language === "ar" ? "اسم المستخدم" : "Username"}
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </label>

                    <label className="form-label">
                        {language === "ar" ? "البريد الإلكتروني" : "Email"}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </label>

                    <label className="form-label">
                        {language === "ar" ? "كلمة المرور" : "Password"}
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </label>

                    <label className="form-label">
                        {language === "ar" ? "تأكيد كلمة المرور" : "Confirm Password"}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </label>

                    <button type="submit" className="create-account-button">
                        {language === "ar" ? "إنشاء الحساب" : "Create Account"}
                    </button>
                </form>

                <p className="already-account-text" onClick={() => navigate("/login")}>
                    {language === "ar" ? "هل لديك حساب بالفعل؟ تسجيل الدخول" : "Already have an account? Login"}
                </p>

                <button className="home-button primary" onClick={() => navigate("/")}>
                    {language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
                </button>
            </div>
        </div>
    );
}

export default CreateAccount;
