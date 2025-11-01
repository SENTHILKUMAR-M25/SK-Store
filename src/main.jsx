import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './Components/CartContext.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
<CartProvider>
  <App />

</CartProvider>
 <Toaster
      position="top-center"  
      richColors              
      closeButton           
    />

</BrowserRouter>
    
  
)