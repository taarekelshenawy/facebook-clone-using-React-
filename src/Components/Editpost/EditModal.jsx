import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Facebookcontext } from '../Context/Context';

export default function Editpost({ show, setShow, id }) {
  const handleClose = () => setShow(false);
  const [post, setPost] = useState({ title: '', body: '', image: '' });
  const [image, setImage] = useState();
  const { getposts } = useContext(Facebookcontext);

 
  async function getpostbyid(id) {
    try {
      const res = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`);
      const { title, body, image } = res.data.data;
      setPost({ title, body, image });
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    if (id) {
      getpostbyid(id);
    }
  }, [id]);

 
  const handlechange = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  async function Editpost(id) {
    const formdata = new FormData();
    formdata.append('title', post.title);
    formdata.append('body', post.body);
      formdata.append('_method', 'put');
    if (image) {
      formdata.append('image', image);
    }

    for (let pair of formdata.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    let token = localStorage.getItem('token');
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post(`https://tarmeezacademy.com/api/v1/posts/${id}`, formdata, config);
      console.log('✅ Response:', res.data.data);
      toast('✅ Post updated successfully');
      getposts();
      setShow(false);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
      toast(error.response?.data?.message || error.message);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault(); // منع الريلود
            Editpost(id);
          }}
        >
          <Form.Group className="mb-3" controlId="editTitle">
            <Form.Label>Your Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={post.title}
              onChange={handlechange}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editImage">
            <Form.Label>Your Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="editBody">
            <Form.Label>Your Body</Form.Label>
            <Form.Control
              type="text"
              name="body"
              value={post.body}
              onChange={handlechange}
            />
          </Form.Group>

          <Modal.Footer className="px-0">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

















// import axios from 'axios';
// import React, { useContext, useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { toast } from 'react-toastify';
// import { Facebookcontext } from '../Context/Context';

// export default function Editpost({show,setShow,id}) {
// const handleClose = () => setShow(false);
// const [post,setPost]=useState({title:'',image:'',body:''});
// const [image,setImage]=useState();
// const {getposts}=useContext(Facebookcontext);





// async function getpostbyid(id) {
//     try{
//          const res = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`);
//        const { title, body, image } = res.data.data;
//     setPost({ title, body, image });
        

//     }catch(error){
//         alert(error.message)
//     }
  
   
   
    
// }
// useEffect(() => {
//   if (id) {
//     getpostbyid(id);
//   }
// }, [id]);




// const handlechange =(e)=>{
//   setPost((prev)=>({...prev,[e.target.name]:e.target.value}))
// }






// async function  Editpost(id) {

// const formdata = new FormData();
// formdata.append('title', post.title);
// if (image) {
//   formdata.append('image', image);
// }
// formdata.append('body', post.body);


//   let token = localStorage.getItem("token");
//   // console.log(token)
//   let config = {
//     headers: {
//        'Content-Type': 'multipart/form-data',
//       "Authorization": `Bearer ${token}`,
//     }
//   }
//    for (let pair of formdata.entries()) {
//     console.log(`${pair[0]}: ${pair[1]}`);
//   }

//   try{
//     let res = await axios.put(`https://tarmeezacademy.com/api/v1/posts/${id}`,formdata, config);
//     console.log("✅ Response:", res.data.data);
    
//     getposts()

//   }catch(error){
//     toast(error.message)
//   }
  




  

// }










//   return (
 
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit post </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form >
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>your title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder=""
//                 autoFocus
//                 value={post?.title || ""}
//                 name='title'
//                 onChange={handlechange}
         
             
             
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//               <Form.Label>your image</Form.Label>
//               <Form.Control
//                 type="file"
//                 placeholder=""
//                 autoFocus
//                 onChange={(e)=>setImage(e.target.files[0])}
          
           
              
//               />
//             </Form.Group>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>your body</Form.Label>
//                <Form.Control
//                 type="text"
//                 placeholder=""
//                 autoFocus
//                 value={post?.body || ""}
//                  onChange={handlechange}
//                  name='body'
                
               
        
                
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary"  onClick={()=>Editpost(id)} >
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal> 

  
//   )
// }
