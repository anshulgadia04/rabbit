import { useState } from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout.jsx'
import Home from './pages/Home.jsx'
import { Toaster, toast } from 'sonner';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Collection from './pages/Collection.jsx';
import ProductDetails from './components/Products/ProductDetails.jsx';
import Checkout from './components/Cart/Checkout.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx';
import OrderDetailsPage from './pages/OrderDetailsPage.jsx';

function App() {
  

  return (
      <BrowserRouter>
      <Toaster position='top-right' />
      <Routes>
        <Route path="/" element={<UserLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="collections/:collection" element={<Collection/>}/>
          <Route path="product/:id" element={<ProductDetails/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
          <Route path="order/:id" element={<OrderDetailsPage/>}/>

          
        </Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
