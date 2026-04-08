import React from "react";

const App = () => {

  // const stopPythonFile = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8080/stop_python_file", {
  //       method: "POST",
  //     });

  //     if (response.ok) {
  //       console.log("Video stopped");
  //     } else {
  //       console.error("Failed to stop video");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  const stopPythonFile = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8085/stop_python_file", {
      method: "POST",
    });

    const data = await response.json();
    console.log(data);

    alert("Video stopped");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Face and Eye Detection</h1>

      {/* ✅ DO NOT TOUCH THIS */}
      <img
        src="http://127.0.0.1:8085/video_feed_haar"
        alt="video"
        width="600"
      />

      <br /><br />

      <button onClick={stopPythonFile}>
        STOP VIDEO
      </button>
    </div>
  );
};

export default App;


// import React, { useEffect } from 'react';

// const App = () => {
//   useEffect(() => {
//     // Function to update the image source with a timestamp
//     const updateImage = () => {
//       const img = document.getElementById('videoFeed');
//       if (img) {
//         img.src = `http://127.0.0.1:8080/video_feed_haar?timestamp=${new Date().getTime()}`;
//       }
//     };

//     // Update the image every second
//     const intervalId = setInterval(updateImage, 1000);

//     // Clear the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   // Function to stop the Python file
//   const stopPythonFile = async () => {
//     try {
//       // Display a confirmation dialog
//       const confirmed = window.confirm('Are you sure you want to stop the Video?');
//       if (!confirmed) {
//         return; // Do nothing if the user cancels the operation
//       }

//       // Send a POST request to the endpoint responsible for stopping the Python file
//       const response = await fetch('http://localhost:8080/stop_python_file', {
//         method: 'POST',
//       });

//       if (response.ok) {
//         console.log('Python file stopped successfully');
//       } else {
//         console.error('Failed to stop Python file');
//       }
//     } catch (error) {
//       console.error('Error stopping Python file:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Face and Eye Detection</h1>
//       <img id="videoFeed" src="http://127.0.0.1:8080/video_feed_haar" alt="Face and Eye Detection" />

//       {/* Button to stop the Python file */}
//       <button onClick={stopPythonFile}>STOP VIDEO</button>
      
//     </div>
//   );
// };

// export default App;