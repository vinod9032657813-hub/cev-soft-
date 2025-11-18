import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Authcontext from './context/Authcontext.jsx'
import Usercontext from './context/Usercontext.jsx'
import ShopContext from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Authcontext>
    <Usercontext>
      <ShopContext>
        <App />
      </ShopContext>
     
     </Usercontext>
  </Authcontext>
   
    </BrowserRouter>
)
