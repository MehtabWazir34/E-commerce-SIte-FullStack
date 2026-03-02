
import { Route, Routes } from 'react-router'
import './App.css'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Header from './Parts/Header'
import Home from './Pages/Home'
import Footer from './Parts/Footer'
import ScrollToHash from './Parts/ScrollToIds'
import Products from './Pages/Products'
import Details from './Pages/ProductDetails.jsx'
import About from './Pages/About'
import ShareNewItem from './Pages/ShareNewItem'
import Order from './Pages/Order'
import MyCart from './Parts/MyCart'
import {useState, useRef } from 'react'

import { BsCartCheckFill, BsCartXFill } from 'react-icons/bs';
import AccountOpt from './Parts/AccountOpt'
import Profile from './Pages/Profile'
// import OrderStatusDropdown from './Parts/dropMenu'
import AdminBoard from './Pages/AdminBoard'
import OrderDetails from './Pages/orderDetails.jsx'
// import axios from 'axios'
import Draggable from 'react-draggable'
import FloatingMenu from './Parts/MobileMenuOpt.jsx'

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [accOpts, setAccOpts] = useState(false);

  return (
    <>
     <section className='w-full h-full overflow-hidden place-items-center'>
      <Header 
      cartOpen={()=> setCartOpen(!cartOpen)}
      cartIcon={cartOpen ? (<BsCartXFill/>) : (<BsCartCheckFill/>)}
      accountOpts={()=> setAccOpts(!accOpts)}
      // searchResult={searchResult} setSearchResult={setSearchResult}
       />
     
        <main className='w-full rounded-md shadow-2xl'>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>

          <Route path='/products' element={<Products/>}/>
          <Route path='/product/details/:id' element={<Details/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/addnewitem' element={<ShareNewItem/>}/>
          <Route path='/placeorder/:id' element={<Order/>}/>
          <Route path='/myaccount' element={<Profile/>}/>
          <Route path='/adminboard' element={<AdminBoard/>}/>
          <Route path='/orderdetails/:id' element={ <OrderDetails/>} />
        </Routes>
     {/* <OrderStatusDropdown/> */}
        </main>
      <FloatingMenu/>
        <ScrollToHash/>
        <Footer/>
        
     {
       cartOpen && (
         <MyCart setCartOpen={setCartOpen}/>
       )
     }
     {
      accOpts && (
        <AccountOpt setAccOpts={setAccOpts}/>
      )
     }
        
     </section>
    </>
  )
}

export default App
