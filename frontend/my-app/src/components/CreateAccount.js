import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccount.css"; // Import the updated CSS
import { registerUser } from "../api"; //added by s

function CreateAccount() {
    const navigate = useNavigate();
    const [isArabic, setIsArabic] = useState(false); // Language state
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

    // Toggle Language
    const toggleLanguage = () => {
        setIsArabic((prev) => !prev);
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validate and submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = { username: "", email: "", password: "", confirmPassword: "" };

        if (!formData.username) {
            newErrors.username = isArabic ? "الرجاء إدخال اسم المستخدم" : "Please enter a username";
        }
        if (!formData.email) {
            newErrors.email = isArabic ? "الرجاء إدخال البريد الإلكتروني" : "Please enter an email";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = isArabic ? "البريد الإلكتروني غير صالح" : "Invalid email format";
        }
        if (!formData.password) {
            newErrors.password = isArabic ? "الرجاء إدخال كلمة المرور" : "Please enter a password";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match";
        }

        setErrors(newErrors);

        // If no errors, navigate to the avatar selection page
        if (!newErrors.username && !newErrors.email && !newErrors.password && !newErrors.confirmPassword) {
            // added by s from here..
            try {
                const result = await registerUser({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                }); // ✅ Call backend API
            
                if (result.error) {
                    alert(result.error); // ✅ Show error if registration fails
                    return;
                }
            
                localStorage.setItem("user", JSON.stringify(result.user)); // ✅ Store user
            } catch (error) {
                console.error("Registration failed:", error);
                alert("Registration failed. Please try again.");
            }
        // till here            
            navigate("/avatar");
        }
    };

    return (
        <div className={`create-account-container ${isArabic ? "rtl" : ""}`}>

            {/* Header */}
            <header className="create-account-header">
                <h1 className="create-account-title1">
                    {isArabic ? "عَبِّرْ" : "Abber"}
                </h1>

                {/* Language switch button */}
                <button className="create-acc-language-switch" onClick={toggleLanguage}>
                    {isArabic ? "English" : "العربية"}
                </button>
            </header>       
            
            {/* Create Account Form Title */}
            <h1 className="create-account-title">
                {isArabic 
                    ? "😊 أهلاً بك! لننشئ حسابك معًا "  
                    : "Let's Create Your Account Together 😊"}
            </h1>

            {/* Wrapper for form and buttons */}
            <div className="form-wrapper">
                {/* Form */}
                <form className={`create-account-form ${isArabic ? "rtl" : ""}`} onSubmit={handleSubmit}>
                    {/* Username */}
                    <label className="form-label">
                        {isArabic ? "اسم المستخدم" : "Username"}
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </label>

                    {/* Email */}
                    <label className="form-label">
                        {isArabic ? "البريد الإلكتروني" : "Email"}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </label>

                    {/* Password */}
                    <label className="form-label">
                        {isArabic ? "كلمة المرور" : "Password"}
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </label>

                    {/* Confirm Password */}
                    <label className="form-label">
                        {isArabic ? "تأكيد كلمة المرور" : "Confirm Password"}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </label>

                    {/* Submit Button */}
                    <button type="submit" className="create-account-button">
                        {isArabic ? "إنشاء الحساب" : "Create Account"}
                    </button>
                </form>

                {/* Already have an account? */}
                <p className="already-account-text" onClick={() => navigate("/login")}>
                    {isArabic ? "هل لديك حساب بالفعل؟ تسجيل الدخول" : "Already have an account? Login"}
                </p>

                {/* Back to Home Button */}
                <button className="home-button primary" onClick={() => navigate("/")}>
                    {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
                </button>
            </div>
        </div>
    );
}

export default CreateAccount;
