import { useParams } from "react-router-dom";
import Header from "../Navbar/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from 'react-bootstrap/Card';
import { FaCommentAlt } from "react-icons/fa";
import { Facebookcontext } from '../Context/Context';
import { IoIosAddCircle } from "react-icons/io";
import Addmodalpost from '../AddModalpost/Addmodalpost';


export default function Postdetails() {
    const [data,setData]=useState();
    const{id}=useParams();

    async function  getpost(id){

        try{
            let response = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`);
            if(response.status >=200 && response.status <300){
                setData(response.data.data)

            }
            toast('success')
        }catch(error){
            toast(error.message)
        }
        
    }
    useEffect(()=>{
        getpost(id)

    },[])

  return (
    <div>
        <Header/>
          <div className='container col-8 mt-5 mb-2' >
        {
            data && 
                <Card style={{ width: '100%',marginBottom:'20px'}} > 
                  <div  className="my-card-header-postdetails"  > 
                    <div>
                          <img src={data.author.profile_image} alt='user-image'></img> 
                    </div>
                      <p>{data.author.username}</p>
                  </div>
                  <Card.Img variant="top" src={data.image} alt={data.title} />
                  <Card.Body>
                    <p>{data.created_at}</p>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                    {data.body}
                    </Card.Text>
                    <hr></hr>
                    <div className='comments'>
                      <div>
                            <FaCommentAlt />
                      </div>
                      <p>5 {data.commets_count} comments</p>
                    </div>
                  </Card.Body>  
                </Card>
    
        }
      
       
          </div>
    </div>
  )
}
   
