import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';  // Adjust the path accordingly

const Dashboard = () => {
  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");
    if (!token) {
      navigate("*");
    }
  };

  useEffect(() => {
    userValid();
  }, []);

  const handleOpenCVButtonClick = () => {
    // Handle OpenCV button click logic
    console.log("OpenCV button clicked");
     navigate("/opencv");
  };

  const handleHaarCascadeButtonClick = () => {
    // Handle Haar Cascade button click logic
    console.log("Haar Cascade button clicked");
    navigate("/haarcascade");
  };

  const handleMediaPipeButtonClick = () => {
    // Handle MediaPipe button click logic
    console.log("MediaPipe button clicked");
    navigate("/mediapipe");
  };

  const handleDeepLearningButtonClick = () => {
    // Handle Deep Learning button click logic
    console.log("Deep Learning button clicked");
    navigate("/Home");
  };
  const handleDeepLearningSelfButtonClick = () => {
    // Handle Deep Learning button click logic
    console.log("Deep Learning Self button clicked");
    navigate("/deep");
  };

  const handleDeepLearningVideoButtonClick = () => {
    // Handle Deep Learning button click logic
    console.log("Deep Learning Video button clicked");
    navigate("/video");
  };


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">VIDEO GESTURE</h1>
      <div className="button-container">
        <button onClick={handleOpenCVButtonClick}>OpenCV</button>
        <button onClick={handleHaarCascadeButtonClick}>Haar Cascade</button>
        <button onClick={handleMediaPipeButtonClick}>MediaPipe</button>
        <button onClick={handleDeepLearningButtonClick}>Deep Learning</button> {/* New button */}
        <button onClick={handleDeepLearningSelfButtonClick}>Deep Learning Self</button> {/* New button */}
        <button onClick={handleDeepLearningVideoButtonClick}>Deep Learning Video</button> {/* New button */}
      </div>
    </div>
  );
};

export default Dashboard;