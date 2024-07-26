import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import ProviderRegister from './Page/Register/Provider'
import UserRegister from './Page/Register/User'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProviderLogin from './Page/Login/Provider';
import UserLogin from './Page/Login/User';
import Home from './Page/Home/Home';
import UserMenu from './Page/menu/userMenu';
import ProviderMenu from './Page/menu/providerMenu'
import Layout from './components/Layout/Layout'
import { ToastContainer } from 'react-toastify'
import Cart from './Page/cart/Cart'

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };
  return (
    <div className='App'>
      <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/provider/register" element={<ProviderRegister />} />
        <Route path="/provider/login" element={<ProviderLogin />} />        
        <Route path="/user/menu" element={<UserMenu addToCart={addToCart} />} />
        <Route path="/provider/menu" element={<ProviderMenu/>} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart}/>} />
      </Routes>
      </Layout>
    </BrowserRouter>
    <ToastContainer/>
    </div>
  )
}

export default App
