import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Facebookprovider from './Components/Context/Context.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Facebookprovider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
      

    </Facebookprovider>
 
  // </StrictMode>,
)
