import { createContext } from "react";
import { toast } from "react-toastify";
import { publicAPI } from "../API/Axios";
import { useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();


const AuthContexProvider =({children})=>{
 const [show, setShow] = useState(false);


// function register
 async function addRegister(jsonData){
       
       try {
         const response =  await publicAPI.post(`/register`, 
                jsonData,
                        
                {
                      headers:{
                          "Content-Type": "multipart/form-data", // ✅ مع axios عادي
                      }
                }
        )
        const token = response.data.token;
        localStorage.setItem('user',JSON.stringify(response.data.user))
        localStorage.setItem('token',token)

          toast('login succefully')

       }
       catch(error){
        toast(error.message)
      
       }
        setShow(false)
       
      }

// function login 
 async function Logindata(Data){
       
       try {
        const response = await publicAPI.post(`/login`, 
                Data,)
        if(response.status >= 200 && response.status < 300){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('user',JSON.stringify(response.data.user))
              toast('login succefully')
        }
        
       }
       catch(error){
        toast(error.message)
      
       }
        setShow(false)
      }


    const contextvalues ={addRegister,Logindata,show,setShow}
    return <AuthContext value={contextvalues}>
             {children}

            </AuthContext>
}

export default AuthContexProvider;