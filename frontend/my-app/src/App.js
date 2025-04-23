import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutMain from "./components/AboutMain";  // Correct import for AboutMain
import AboutHome from "./components/AboutHome";  // Correct import for AboutHome
import EmotionDetection from "./components/EmotionDetection";
import { AuthProvider } from "./context/AuthContext";
import CreateAccount from "./components/CreateAccount";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import Avatar from "./components/Avatar";
import NextPage from "./components/NextPage"; 
import Profile from "./components/Profile"; 
import HelpPage from "./components/Help";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/aboutmain" element={<AboutMain />} />  
          <Route path="/abouthome" element={<AboutHome />} />  
          <Route path="/emotion-detection" element={<EmotionDetection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Help" element={<HelpPage />} />
          <Route path="/next-page" element={<NextPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
