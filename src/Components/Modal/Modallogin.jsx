
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { PostsContext } from '../../Context/PostsContext';


export default function Modallogin({show,setShow}) {
    const [username,setUsername]=useState();
    const [image,setImage]=useState();
    const [password,setPassword]=useState();
    const {Logindata}=useContext(AuthContext);
    const {getposts}=useContext(PostsContext)

       const formData = new FormData();
        formData.append('username',username)
        formData.append('image',image);
        formData.append('password',password);
   

      const handleClose = () => setShow(false);
  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>user name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                autoFocus
                onChange={(e)=>setUsername(e.target.value)}
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
              <Form.Label>Password</Form.Label>
               <Form.Control
                type="password"
                placeholder=""
                autoFocus
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{Logindata(formData);getposts()}}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal> 
          </>
  )
}
