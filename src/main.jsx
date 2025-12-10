
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Facebookprovider from './Context/userContext.jsx';
import AuthContexProvider from './Context/AuthContext.jsx';
import PostscontextProvider from './Context/PostsContext.jsx';
import UserContextProvier from './Context/userContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(

    
      <AuthContexProvider>
        <PostscontextProvider>
          <UserContextProvier>
            <BrowserRouter>
            <App />
            </BrowserRouter>
          </UserContextProvier>
        </PostscontextProvider>
      </AuthContexProvider>
       



 
)
