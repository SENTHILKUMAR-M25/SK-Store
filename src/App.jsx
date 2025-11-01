import React from 'react'
import Index from './Components/Index.jsx'
import Header from './Components/Header'
import CartDraw from './Components/CardDraw'
import { Routes ,Route } from 'react-router-dom'
import Products from './Components/Products'
import ProductDetail from './Components/ProductDetails'
import Checkout from './Components/Checkout'
import Footer from './Components/Footer'

const App = () => {
  return (
  <>
  <Header />
<CartDraw />
<Routes>
  <Route path='/' element={<Index />} />
  <Route path='/products' element={<Products />} /> 
  <Route path='/product/:id' element={<ProductDetail />} /> 
  <Route path='/checkout' element={<Checkout />} /> 

</Routes>
<Footer />

  
  </>
  )
}

export default App