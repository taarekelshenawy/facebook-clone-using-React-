

import Modallogin from './Modallogin';
import Modalregister from './Modalregister';

export default function Authmodal({show,setShow,state}) {

 
  return (
     <>
     {
        state === 'Login' ?
     <Modallogin show={show} setShow={setShow}/>
     :
     <Modalregister show={show} setShow={setShow}/>
   
     }
      
    </>
  )
}
