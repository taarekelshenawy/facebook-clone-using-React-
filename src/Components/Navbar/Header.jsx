
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext,  useState } from 'react';
import Authmodal from '../Modal/Authmodal';
import Button from 'react-bootstrap/Button';
import { Facebookcontext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Header() {

   const [state,setState]=useState('');
   const {show,setShow,getposts}=useContext(Facebookcontext);
   const navigate = useNavigate()
   

  
  const handleLogin = () => {
    setShow(true);
    setState('Login')
  };
  const handleRegister=()=>{
    setShow(true);
    setState('register')
    
  }
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'))

  function Logout(){
    localStorage.removeItem('token');
    navigate('/')
    getposts()
    
  }
 

 
 
  return (
    <div className='container col-8'>
          <Navbar expand="lg" bg="primary" data-bs-theme="dark" >
              <Container fluid>
                <Navbar.Brand as={Link} to="/" aria-label='home-page'>Facebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link as={Link} to="/" aria-label='home-page'>Home</Nav.Link>
                    {user && (
                        <Nav.Link as={Link} to={`/profile/${user.id}`} aria-label='profile-page'>Profile</Nav.Link>
                      )}
              
                
                  </Nav>
                  {
                    token ? 
                   <Form className="d-flex  align-items-center gap-3">
                    { user &&
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                    <img src={user.profile_image} alt='user-image' className='user-image' ></img>
                    <p className='user-name'>{user.name}</p>

                    </div> 
                
                    }
                 
                    <Button variant="danger" onClick={()=>Logout()}>Log out</Button>
                   
                  </Form> :
                   <Form className="d-flex gap-3">
                    <Button variant="success" onClick={handleLogin}>Login</Button>
                    <Button variant="success" onClick={handleRegister}>Register</Button>
                  </Form>

                  }
                 
                </Navbar.Collapse>
              </Container>
              <Authmodal show={show} setShow={setShow} state={state}/>
          </Navbar>
    </div>
  )
}
