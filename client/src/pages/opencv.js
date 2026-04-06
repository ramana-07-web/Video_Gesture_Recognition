// import React from "react";

// const OpenCV = () => {

//   const stopVideo = async () => {
//     await fetch("http://127.0.0.1:5000/stop", {
//       method: "POST",
//     });
//   };

//   return (
//     <div>
//       <h1>Hand Detection</h1>

//       {/* 🔥 NO REFRESH SPAM */}
//       <img
//         src="http://127.0.0.1:5000/video_feed"
//         alt="video"
//         width="600"
//       />

//       <br /><br />

//       <button onClick={stopVideo}>Stop Video</button>
//     </div>
//   );
// };

// export default OpenCV;

import React, { useEffect } from 'react';

const OpenCV= () => {
  

  useEffect(() => {
    // Auto-refresh the video feed every 100 milliseconds
    const refreshVideoFeed = () => {
      const videoFeed = document.getElementById('video_feed');
      if (videoFeed) {
        videoFeed.src = `http://127.0.0.1:5000/video_feed?${new Date().getTime()}`;
      }
    };

    const intervalId = setInterval(refreshVideoFeed, 100);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Function to stop the Python file
  const stopPythonFile = async () => {
    try {
      // Display a confirmation dialog
      const confirmed = window.confirm('Are you sure you want to stop the Video?');
      if (!confirmed) {
        return; // Do nothing if the user cancels the operation
      }

      // Send a POST request to the endpoint responsible for stopping the Python file
      const response = await fetch('http://localhost:5000/stop_python_file', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Python file stopped successfully');
      } else {
        console.error('Failed to stop Python file');
      }
    } catch (error) {
      console.error('Error stopping Python file:', error);
    }
  };

  return (
    <div>
      <h1>Hand Gesture Recognition</h1>
      <img id="video_feed" src="http://127.0.0.1:5000/video_feed" alt="Hand Gesture Feed" />
     {/* Button to stop the Python file */}
     
     <button onClick={stopPythonFile}>STOP VIDEO</button>
      
    </div>
  );
};

export default OpenCV;
