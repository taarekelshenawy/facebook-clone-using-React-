import React, { useContext, useEffect } from 'react';
import Header from '../Navbar/Header';
import { useParams } from 'react-router-dom';
import { Facebookcontext } from '../Context/Context';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCommentAlt } from 'react-icons/fa';
import {Button} from 'react-bootstrap';
import { useState } from 'react';
import Editpost from '../Editpost/EditModal';


export default function Profile() {
    const {id}=useParams();
    const {getUser,user,userposts,getPostsforuser,Deletepost}=useContext(Facebookcontext);
    const [editpost,setEditpost] = useState(false);
    const [editId, setEditId] = useState(null);
     

    let userinfo = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token')



      function Edithandle(id){
        setEditpost(true)
        setEditId(id)
        
      }

        useEffect(()=>{
            getUser(id)
          getPostsforuser(id)

        },[])

    


  return (
    <div>
        <Header/>
        {
          token ?
          <>
            <div className="container col-8">
                <div>
                    <div className="card my-4">
                        <div className="card-body" style={{ cursor: 'pointer' }}>
                            <div className="row align-items-center">
                                <div className="col-12 col-sm-2 d-flex justify-content-center mb-2 mb-sm-0">
                                    <img
                                    src={user && user.profile_image}
                                    alt="user-profile"
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50px',
                                        objectFit: 'cover'
                                    }}
                                    />
                                </div>
                                <div className="col-12 col-sm-4 mb-2 mb-sm-0">
                                    <div style={{ fontSize: '23px', fontWeight: 'bold' }}>
                                    {user && user.name}
                                    </div>
                                    <div>{user && user.username}</div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div>
                                    <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '5px' }}>
                                        {user && user.posts_count}
                                    </span>
                                    posts
                                    </div>
                                    <div>
                                    <span style={{ fontWeight: 'bold', fontSize: '20px', marginRight: '5px' }}>
                                        {user && user.comments_count}
                                    </span>
                                    comments
                                    </div>
                                </div>  
                            </div>
                        </div>
                            </div>
                </div>
            </div>

       {/* get posts for user */}
       {
        userposts && 
        userposts.map((item,index)=>{
            return(
             <div className='container col-8' key={index}>
              <Card style={{ width: '100%',marginBottom:'20px'}}  >
                  <div  className="my-card-header" >
                      <div className='my-card-data'>
                      <img src={item.author.profile_image} alt='user-image' ></img>
                      <p>{item.author.username}</p>

                      </div>
          
                    {
                      item.author.id === userinfo.id ? 
                      <div className='my-card-buttons'>
                        <Button variant="success"  onClick={()=>Edithandle(item.id)}>Edit</Button>
                        <Button variant="danger" onClick={()=>Deletepost(item.id)}>Delete</Button>
                      
                      </div> :''

                      }
                
                  </div>
                  <Link to={`/postdetails/${item.id}`}><Card.Img variant="top"  src={item.image} /> </Link>
                  <Card.Body>
                    <p>{item.created_at}</p>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text> {item.body} </Card.Text>
                    <hr></hr>
                    <div className='comments'>
                      <div>
                            <FaCommentAlt />
                      </div>
                      <p>5 {item.commets_count} comments</p>
                    </div>

                  </Card.Body>
              </Card>

             </div>



            
         
            )

        }
        )
       }
        <Editpost show={editpost} setShow={setEditpost} id={editId} />
          </> :
          <div className='container col-8 mt-5'>
            <h3>You Must Login First</h3>

          </div> 
        } 
     
         


 
    </div>
  )
}
