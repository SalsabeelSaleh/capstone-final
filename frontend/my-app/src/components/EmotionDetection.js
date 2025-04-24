import React, { useRef, useContext, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./EmotionDetection.css";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

export default function EmotionDetection() {
  const { language, toggleLanguage } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
  const webcamRef = useRef(null);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [emotion, setEmotion] = useState(""); //state to hold AI prediction


  const requestCameraAccess = () => {
    setShowWebcam(true);
  };

  const handleUserMedia = () => {
    setCameraAllowed(true);
    setCameraError(false);
  };

  const handleUserMediaError = (error) => {
    setCameraAllowed(false);
    setCameraError(true);
  };
  
// Send webcam image to backend every second
  useEffect(() => {
    if (webcamRef.current && cameraAllowed) {
      const interval = setInterval(() => {
        const screenshot = webcamRef.current.getScreenshot();
        if (screenshot) {
          socket.emit("video_frame", { frame: screenshot }); // add 
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cameraAllowed]);

  // Receive emotion prediction from backend
  useEffect(() => {
    socket.on("emotion_result", (data) => {
      setEmotion(data.emotion);
    });

    return () => {
      socket.off("emotion_result");
    };
  }, []);

  return (
    <div className="emotion-container">
      {/* Header */}
      <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
        <h1 className="login-title1">
          {language === "en" ? "Abber" : "عَبِّرْ"}
        </h1>
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      {/* Welcome Message */}
      <h1 className="emotion-welcome">
        {language === "en"
          ? "Welcome to Aaber Emotion Detection System 👋"
          : " 👋 مرحبًا في نظام الكشف عن المشاعر عابر "}
      </h1>

      {/* Notification before webcam */}
      {!showWebcam && (
        <div className="emotion-notification">
          <p className="font-semibold">🔔 Notification:</p>
          <p>
            {language === "en"
              ? "Please allow camera access to start detecting emotions."
              : "يرجى السماح بالوصول إلى الكاميرا لبدء الكشف عن المشاعر."}
          </p>
          <button className="allow-camera-btn" onClick={requestCameraAccess}>
            {language === "en" ? "Allow Camera" : "السماح بالكاميرا"}
          </button>
        </div>
      )}

      {/* Error Notification */}
      {cameraError && (
        <div className="emotion-notification">
          <p className="font-semibold">⚠️ Error:</p>
          <p>
            {language === "en"
              ? "Could not access the camera. Please check your permissions."
              : "تعذر الوصول إلى الكاميرا. يرجى التحقق من الأذونات."}
          </p>
        </div>
      )}

      {/* Webcam after access */}
      {showWebcam && (
        <div className="emotion-video-container">
          <h2 className="emotion-title">
            {language === "en"
              ? "Position your face inside the frame 😊"
              : " 😊 ضع وجهك داخل الإطار "}
          </h2>
          <Webcam
            ref={webcamRef}
            className="emotion-webcam"
            style={{ width: 1600, height: 900 }}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
          />
            {/* Emotion Output */}
            {emotion && (
              <div className="emotion-output">
              <h2>
            {language === "en" ? "Detected Emotion: " : "العاطفة المكتشفة: "}
            {emotion}
              </h2>
              </div>
              )}
    

        </div>
      )}
        </div>
      )}

   

      {/* Back to Home Button */}
      <div className="back-button-container">
        <button
          className="home-button secondary"
          onClick={() => navigate("/main-page")} // Navigate back to the mainpage.js page
        >
          {language === "en" ? "Back to Home" : "الرجوع إلى الرئيسية"}
        </button>
      </div>
    </div>
  );
}
