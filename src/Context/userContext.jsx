import { createContext,  useState } from "react";
import { toast } from "react-toastify";
import { publicAPI } from "../API/Axios";



// eslint-disable-next-line react-refresh/only-export-components
export const usercontext = createContext();

const UserContextProvier =(props)=>{
    const [user,setUser]=useState();
    const [userposts,setUserposts]=useState([]);
    const [loading,setLoading]=useState(false);



// function Getuser
async function getUser(id){
    try{
        await publicAPI.get(`/users/${id}`)
        .then((res)=>setUser(res.data.data))
    }catch(error){
        toast(error.message)
    }
}

// function getpostsforuser
async function getPostsforuser(userid) {
    try{
        const res = await publicAPI.get(`/users/${userid}/posts`)
        setUserposts(res.data.data)
    }catch(error){
        toast(error.message)
    }
    
}

const contextvalue={
    getUser,user,userposts,getPostsforuser,loading,setLoading}
    return(
        <usercontext.Provider value={contextvalue}>
            {props.children}
        </usercontext.Provider>

    )
}

export default UserContextProvier;