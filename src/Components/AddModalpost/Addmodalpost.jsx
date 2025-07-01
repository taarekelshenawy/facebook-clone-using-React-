import axios from 'axios';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Facebookcontext } from '../Context/Context';

export default function Addmodalpost({show,setShow}) {
const handleClose = () => setShow(false);
const [title,setTitle]=useState();
const [image,setImage]=useState();
const [body,setBody]=useState();
const {getposts}=useContext(Facebookcontext);

const formdata = new FormData()

formdata.append("title",title);
formdata.append("image",image);
formdata.append('body',body);

async function createpost(){
let token = localStorage.getItem('token')
    try{
        let response = await axios.post('https://tarmeezacademy.com/api/v1/posts',
            formdata,
                 {
                      headers:{
                          'Authorization': `Bearer ${token}`,
                          "Content-Type": "multipart/form-data", // ✅ مع axios عادي
                      }
                }
            
        )
        if(response.status >= 200 && response.status <300){
            toast("success")

        }
        setShow(false)
        getposts()


    }catch(error){
        toast(error.message)

    }

}


  return (
 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add post </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>your title</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                onChange={(e)=>setTitle(e.target.value)}
             
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>your image</Form.Label>
              <Form.Control
                type="file"
                placeholder=""
                autoFocus
                onChange={(e)=>setImage(e.target.files[0])}
              
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>your body</Form.Label>
               <Form.Control
                type="text"
                placeholder=""
                autoFocus
                onChange={(e)=>setBody(e.target.value)}
                
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createpost} >
            Submit
          </Button>
        </Modal.Footer>
      </Modal> 

  
  )
}
