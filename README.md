# 🎥 Video Gesture Recognition

A comprehensive full-stack application that utilizes modern Computer Vision and Deep Learning techniques to recognize human gestures, detect faces, and track hand movements in real-time. This project features a React frontend and a Python multi-service backend, orchestrating various machine learning tools.

## ✨ Features
* **Real-time Camera Streaming:** Streams video directly from your webcam to the web UI.
* **Deep Learning Gesture Classification:** Upload images or videos to predict up to 20 different hand gestures using a pre-trained TensorFlow/Keras model (`mymodel.h5`).
* **Face & Eye Detection:** Live detection overlay using robust OpenCV Haar Cascades.
* **Hand Tracking & Gesture Counting:** Real-time hand landmark detection using MediaPipe to accurately recognize dynamic movements (like waving or counting fingers).
* **Microservice Architecture:** Independent Python backend scripts (Flask & FastAPI) handling specialized ML workloads to prevent processor blocking.

## 🛠️ Technology Stack
**Frontend:**
* React.js
* HTML5 / CSS3

**Backend:**
* Python
* FastAPI (Deep Learning endpoint orchestration)
* Flask (Live OpenCV streaming servers)
* Uvicorn (ASGI web server implementation)

**Machine Learning & Computer Vision:**
* TensorFlow / Keras (For gesture classification models)
* OpenCV (`cv2`) (For video capturing, processing, and Haar cascades)
* MediaPipe (For geometric hand and finger tracking)

## 📂 Project Structure
```text
Video_Gesture_Recognition/
│
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── pages/          # UI Components (Dashboard, Haarcascade, Mediapipe, Setup)
│   │   └── services/       # API Helper functions
│   ├── package.json
│   └── ...
│
├── server/                 # Python Backend Microservices
│   ├── main.py             # FastAPI server (Image gesture prediction using TensorFlow)
│   ├── main2.py            # FastAPI server (Video batch gesture prediction)
│   ├── app.py              # Flask server (MediaPipe Hand Tracking)
│   ├── app2.py             # Flask server (OpenCV Face/Eye Haar Cascades)
│   ├── model.h5            # Deep Learning Model Weights 
│   ├── mymodel.h5          # Deep Learning Model Weights
│   ├── haarcascade_*.xml   # Pre-trained Haar Cascade classifiers
│   └── requirements.txt    # (Optional) Python dependencies
│
└── README.md
```

## 🚀 Setup and Installation

### 1. Clone the repository
```bash
git clone https://github.com/ramana-07-web/Video_Gesture_Recognition.git
cd Video_Gesture_Recognition
```

### 2. Frontend Setup (React)
Open a new terminal and navigate to the `client` directory:
```bash
cd client
npm install
```

### 3. Backend Setup (Python)
Open a new terminal and navigate to the `server` directory. It is highly recommended to use a virtual environment.
```bash
cd server
pip install -r requirements.txt 
# Or install manually: pip install flask fastapi uvicorn tensorflow opencv-python mediapipe pillow flask-cors
```

## 💻 How to Run

Because this app utilizes a microservice architecture for heavy machine learning loads, different parts of the app are engaged on different ports.

**1. Start the React Frontend**
```bash
cd client
npm start
```
*The web interface will launch on `http://localhost:3000`*

**2. Start the Deep Learning Engine (FastAPI)**
```bash
cd server
python main.py
```
*Runs on Port `8090`*

**3. Start the Live Face/Eye Detection Server (Flask)**
```bash
cd server
python app2.py
```
*Runs on Port `8085`*

**4. Start the Hand Tracking Server (Flask)**
```bash
cd server
python app.py
```

## 🛑 Troubleshooting

* **File Not Found / Video Stream Fails:** If the React dashboard fails to load the camera feed, ensure another application (like Zoom or Teams) isn't stealing your webcam. 
* **Port Conflicts:** Ensure no background Windows services are intercepting your ports (e.g., `Connect.exe` hiding on Port 8080).
* **Camera Shows Blank Screen or Static:** If the stream connects but the frame is black/glitchy, let OpenCV use the default camera driver (`cv2.VideoCapture(0)`) instead of forcing DirectShow (`cv2.CAP_DSHOW`), as some integrated webcams use raw streaming formats.

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
