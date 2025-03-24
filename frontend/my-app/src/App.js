import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import EmotionDetection from "./components/EmotionDetection";
import { AuthProvider } from "./context/AuthContext";
import CreateAccount from "./components/CreateAccount";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import Avatar from "./components/Avatar"; // Import Avatar component
import NextPage from "./components/NextPage"; // Import the NextPage component for selected avatar display
import Profile from "./components/Profile"; // Import Profile component
import HelpPage from "./components/Help"; // Import HelpPage component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/about" element={<About />} />
          <Route path="/emotion-detection" element={<EmotionDetection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/avatar" element={<Avatar />} /> 
          <Route path="/profile" element={<Profile />} />
          <Route path="/Help" element={<HelpPage />} />
          {/* Add NextPage route */}
          <Route path="/next-page" element={<NextPage />} /> {/* This route will show the selected avatar */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
