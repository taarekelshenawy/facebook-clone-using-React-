import { Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Header from "./Components/Navbar/Header";
import Postdetails from "./Components/Postdetails/Postdetails";
import { ToastContainer } from 'react-toastify';
import Home from "./Components/Home/Home";
import Profile from "./Components/Profileuser/Profile";


function BasicExample() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/postdetails/:id" element={<Postdetails/>}></Route>
      <Route path="/profile/:id" element={<Profile/>}></Route>
    </Routes>

    
   
    </>
   
  );
}

export default BasicExample;
