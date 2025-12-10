import { Route, Routes } from "react-router-dom";
import Postdetails from "./Components/Postdetails/Postdetails";
import { ToastContainer } from 'react-toastify';
import Homepage from "./Pages/Homepage";
import Profilepage from "./Pages/Profilepage";


function BasicExample() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Homepage/>}></Route>
      <Route path="/postdetails/:id" element={<Postdetails/>}></Route>
      <Route path="/profile/:id" element={<Profilepage/>}></Route>
    </Routes>

    
   
    </>
   
  );
}

export default BasicExample;
