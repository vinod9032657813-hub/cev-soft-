import { Routes, Route } from 'react-router-dom'
import Registration from './Pages.js/Registration.jsx'
import Login from './Pages.js/Login.jsx'
import Home from './Pages.js/Home.jsx'
import Nav from './Component.js/Nav.jsx'
import Footer from './Component.js/Footer.jsx'
import About from './Pages.js/About.jsx'
import Collection from './Pages.js/Collection.jsx'
import Cantact from './Pages.js/Cantact.jsx'
import Product from './Pages.js/Product.jsx'
import Order from './Pages.js/Order.jsx'
import Cart from './Pages.js/Cart.jsx'
import Checkout from './Pages.js/Checkout.jsx'
import OrderAll from './Pages.js/OrderAll.jsx'
import MyOrders from './Pages.js/MyOrders.jsx'
import VoiceAssistant from './Component.js/VoiceAssistant.jsx'

const App = () => {
  
  
  return (
    <div className="flex flex-col min-h-screen"> 
      <Nav/>
      <VoiceAssistant />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/collection" element={<Collection/>} />
          <Route path="/cantact" element={<Cantact/>} />
          <Route path="/product" element={<Product/>} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/order/:id" element={<Order/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/order-all" element={<OrderAll/>} />
          <Route path="/my-orders" element={<MyOrders/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App