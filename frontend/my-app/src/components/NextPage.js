import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Importing framer-motion for animations
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./NextPage.css"; // Ensure to add a custom stylesheet

export default function NextPage() {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const avatar = localStorage.getItem('selectedAvatar');
        if (avatar) {
            setSelectedAvatar(avatar);
        }
    }, []);

    return (
        <div className="next-page-container">
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="page-title"
            >
                {selectedAvatar ? "🎉 Your Selected Avatar is..." : "Oops! No Avatar Selected!"}
            </motion.h1>

            {selectedAvatar ? (
                <motion.div
                    className="avatar-display"
                    dangerouslySetInnerHTML={{ __html: selectedAvatar }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 200 }}
                />
            ) : (
                <p>No avatar selected.</p>
            )}

            {selectedAvatar && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="celebration-message"
                >
                    🥳 Great choice ! Your profile creation is completed !
                </motion.div>
            )}

            <motion.button
                className="continue-button"
                onClick={() => navigate("/main-page")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                Continue
            </motion.button>
        </div>
    );
}
