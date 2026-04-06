import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Otp from './pages/Otp';
import Error from './pages/Error';
import OpenCV from './pages/opencv';
import Mediapipe from './pages/mediapipe';
import Haarcascade from './pages/haarcascade';
import Home from './pages/Home';
import Deep from './pages/deep';
import Video from './pages/video';
import Headers from './components/Headers';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
    {/* <BrowserRouter> */}
      <Headers />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user/otp' element={<Otp />} />
        <Route path='/opencv' element={<OpenCV/>} />
        <Route path='/mediapipe' element={<Mediapipe/>} />
        <Route path='/haarcascade' element={<Haarcascade/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/deep' element={<Deep/>} />
        <Route path='/video' element={<Video/>} />
        <Route path='*' element={<Error />} />
      </Routes>
    {/* </BrowserRouter> */}
    </>
  );
}

export default App;
