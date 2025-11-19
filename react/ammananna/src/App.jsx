import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
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
import ScrollToTop from './Component.js/ScrollToTop.jsx'

const App = () => {
  // Wake up the server when app loads
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        console.log('🔄 Waking up server...');
        await fetch('https://cev-soft.onrender.com');
        console.log('✅ Server wake-up ping sent');
      } catch (error) {
        console.log('⚠️ Server wake-up ping sent (may take 30-60s to respond)');
      }
    };

    wakeUpServer();

    // Ping server every 10 minutes while user is on the site
    const interval = setInterval(wakeUpServer, 600000); // 10 minutes

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen"> 
      <ScrollToTop />
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