
import Card from 'react-bootstrap/Card';
import { FaCommentAlt } from "react-icons/fa";
import { useContext } from 'react';
import { Facebookcontext } from '../Context/Context';
import addicon from '../images/add.png';
import Addmodalpost from '../AddModalpost/Addmodalpost';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Editpost from '../Editpost/EditModal';



export default function Homepage() {
  const {posts,Deletepost}= useContext(Facebookcontext);
  const [showmodalpost, setShowmodalpost] = useState(false);
  const [editpost,setEditpost] = useState(false);
  const [editId, setEditId] = useState(null);
 
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

   const handleShow = () => setShowmodalpost(true);
  function Edithandle(id){
    setEditpost(true)
    setEditId(id)
    
  }


  return (
    <div className='container col-8 mt-5 mb-2' >
      {
        token ? 
         <div>
          <img src={addicon} alt='add-icon' className='add-icon' onClick={handleShow}></img>
          <Addmodalpost show={showmodalpost} setShow={setShowmodalpost}/>
           
        </div> : ""
      }
     
     
  {
    posts.map((item,index)=>{
      return(
         <Card style={{ width: '100%',marginBottom:'20px'}} key={index} >
               <div  className="my-card-header" >
                  <div className='my-card-data'>
                  <img src={item.author.profile_image} alt='user-image' ></img>
                  <p>{item.author.username}</p>
                  </div>

                {token && <>
                 {
                  item.author.id === user.id ? 
                  <div className='my-card-buttons'>
                    <Button variant="success"  onClick={()=>Edithandle(item.id)}>Edit</Button>
                    <Button variant="danger" onClick={()=>Deletepost(item.id)}>Delete</Button>
                   
                  </div> :''

                  }
                </>
                }
               
                
            
               </div>
          <Link to={`/postdetails/${item.id}`}><Card.Img variant="top"  src={item.image} alt={item.title} /> </Link>
          <Card.Body>
            <p>{item.created_at}</p>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
            {item.body}
            </Card.Text>
            <hr></hr>
            <div className='comments'>
              <div>
                    <FaCommentAlt />
              </div>
              <p>5 {item.commets_count} comments</p>
            </div>
          </Card.Body>
          </Card>


      )
      
    },
        
  
  )
 
           
  }
   
   
         
<Editpost show={editpost} setShow={setEditpost} id={editId} />
   
   
         

  
         

    </div>
  )
}
