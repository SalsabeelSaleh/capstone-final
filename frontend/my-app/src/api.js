const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

// Register a new user
export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    return response.json();
};

// Login user
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    return response.json();
};

// Get user profile data
export const getUserProfile = async (userId) => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    return response.json();
};

// Send image data for emotion detection
export const sendDetectionData = async (imageData) => {
    const response = await fetch(`${API_BASE_URL}/detect-emotion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
    });

    return response.json();
};
