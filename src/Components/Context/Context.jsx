import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


// eslint-disable-next-line react-refresh/only-export-components
export const Facebookcontext = createContext();

const Facebookprovider =(props)=>{

    const [posts,setPosts]=useState([]);
    const [show, setShow] = useState(false);
    const [user,setUser]=useState();
    const [userposts,setUserposts]=useState([])
    const  url ='https://tarmeezacademy.com/api/v1';

async function getposts() {
    const response = await fetch(`${url}/posts?limit=50`);
    const json= await response.json();
    setPosts(json.data);
    
}
useEffect(()=>{
    getposts()

},[])

// function register
 async function addRegister(jsonData){
       
       try {
         const response =  await axios.post(`${url}/register`, 
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
    const token = localStorage.getItem('token')
       
       try {
        let response = await axios.post(`${url}/login`, 
                Data,
                        
                {
                      headers:{
                          'Authorization': `Bearer ${token}`,
                          "Content-Type": "multipart/form-data", // ✅ مع axios عادي
                      }
                }
        )
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
 

// function Deletepost
async function Deletepost(id){
    const token = localStorage.getItem('token')

     let config = {
    headers: {
       'Content-Type': 'multipart/form-data',
      "Authorization": `Bearer ${token}`,
    }
  }
  
try{
       await axios.delete(`${url}/posts/${id}`,config )
    .then(()=> getposts())

}
catch(error){
    alert(error.message)
}
 
}

// function Getuser
async function getUser(id){
    try{
        await axios.get(`${url}/users/${id}`)
        .then((res)=>setUser(res.data.data))
    }catch(error){
        toast(error.message)
    }
}

// function getpostsforuser
async function getPostsforuser(userid) {
    try{
        const res = await axios.get(`${url}/users/${userid}/posts`)
        setUserposts(res.data.data)
    }catch(error){
        toast(error.message)
    }
    
}

const contextvalue={posts,addRegister,Logindata,show,setShow,
    getposts,Deletepost,getUser,user,userposts,getPostsforuser}


    return(
        <Facebookcontext.Provider value={contextvalue}>
            {props.children}
        </Facebookcontext.Provider>

    )
}

export default Facebookprovider;