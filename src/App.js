import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './Pages/AdminPage';
import Condition from './Pages/Condition';
import TimeWorking from './Pages/TimeWorking';
import Login from './Pages/Login';
import Photos from './Pages/Photos';
import Comments from './Pages/Comments';
import RequireAuth from './Pages/RequreAuth';
import Navbarr from './Pages/Navbarr';
import AddPic from './Pages/AddPic';
import Users from './Pages/Users';
import AllComments from './Pages/AllComments';
import LoginControl from './Pages/LoginControl';
import ReactCropper from "./Pages/ReactCropper"
import PicArt from "./Pages/PicArt"
import LoginControlUpdate from "./Pages/LoginControlUpdate"
import LoginCrop from "./Pages/LoginCrop"
import Tem from './Pages/Tem';
import Latest from './Pages/Latest';
import { useState } from 'react';
import LoginArt from './Pages/LoginArt';
import AllPhotos from './Pages/AllPhotos';
import ExtractAll from './Pages/ExtractAll';

function App() {

  const [imag, setImag]=useState()
  const [imagLog, setImagLog]=useState()
    
  return (
    <div className="App"> 
      <Navbarr/>
      <Routes>
        <Route path="/" element={<RequireAuth><Condition/></RequireAuth>} ></Route>
        <Route path="/timeWorking/:time" element={<RequireAuth><TimeWorking/></RequireAuth>} ></Route>
        <Route path="/photos/:number" element={<RequireAuth><Photos/></RequireAuth>} ></Route>
        <Route path="/admin" element={<RequireAuth><AdminPage/></RequireAuth>} ></Route>
        <Route path="/login" element={<Login/>} ></Route>
        <Route path="/comments" element={<RequireAuth><Comments/></RequireAuth>} ></Route>
        {/* <Route path="/addPic" element={<RequireAuth><AddPic/></RequireAuth>} ></Route> */}
        <Route path="/cropper" element={<RequireAuth><ReactCropper/></RequireAuth>} ></Route>
        <Route path="/addPic" element={<RequireAuth><PicArt imag={imag}/></RequireAuth>} ></Route>
        <Route path="/users" element={<RequireAuth><Users/></RequireAuth>} ></Route>
        <Route path="/all-comments" element={<RequireAuth><AllComments/></RequireAuth>} ></Route>
        <Route path="/login-control" element={<RequireAuth><LoginControl/></RequireAuth>} ></Route> 
        <Route path="/login-control-update" element={<RequireAuth><LoginControlUpdate imagLog={imagLog}/></RequireAuth>} ></Route>
        <Route path="/login-control-crop" element={<RequireAuth><LoginCrop/></RequireAuth>} ></Route>
        <Route path="/tem" element={<RequireAuth><Tem/></RequireAuth>} ></Route>
        <Route path="/latest" element={<RequireAuth><Latest setImag={setImag}/></RequireAuth>} ></Route>
        <Route path="/login-art" element={<RequireAuth><LoginArt setImagLog={setImagLog}/></RequireAuth>} ></Route>
        <Route path="/allPhotos" element={<RequireAuth><AllPhotos /></RequireAuth>} ></Route>
        <Route path="/extractAll" element={<RequireAuth><ExtractAll /></RequireAuth>} ></Route>

      </Routes>
      

      {/* heroku backend  */}
      {/* https://dry-inlet-69648.herokuapp.com/ */}
     
    </div>
  );
}

export default App;
