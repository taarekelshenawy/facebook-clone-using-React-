import { createContext } from "react";
import { publicAPI } from "../API/Axios";
import { useEffect } from "react";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();


const PostscontextProvider=({children})=>{
 const [loading,setLoading]=useState(false);
 const [posts,setPosts]=useState([]);


    
async function getposts() {
      setLoading(true)
    const response = await publicAPI.get(`/posts?limit=50`);
    setPosts(response.data.data);
    setLoading(false);  
}
useEffect(()=>{
     getposts()

},[])

 

// function Deletepost
async function Deletepost(id){
    
    try{
        await publicAPI.delete(`/posts/${id}`)
        .then(()=> getposts())

    }
    catch(error){
        alert(error.message)
    }
 
}

const contextvalues ={loading,getposts,Deletepost,posts}
    return <PostsContext value={contextvalues}>
        {children}
    </PostsContext>
}

export default PostscontextProvider;