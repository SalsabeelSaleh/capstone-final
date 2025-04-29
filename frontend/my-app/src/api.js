const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Registration failed");
        }

        return data;
    } catch (error) {
        console.error("Registration error:", error);
        return { error: error.message };
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
    }
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
