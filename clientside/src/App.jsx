
import { Route, Routes } from 'react-router'
import './App.css'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Header from './Parts/Header'
import Home from './pages/Home'
import Footer from './Parts/Footer'
import ScrollToHash from './Parts/ScrollToIds'
import Products from './pages/Products'
import Details from './pages/ProductDetails.jsx'
import About from './pages/About'
import ShareNewItem from './pages/ShareNewItem'
import Order from './pages/Order'
import MyCart from './Parts/MyCart'
import {useState } from 'react'

import { BsCartCheckFill, BsCartXFill } from 'react-icons/bs';
import AccountOpt from './Parts/AccountOpt'
import Profile from './pages/Profile'
// import OrderStatusDropdown from './Parts/dropMenu'
import AdminBoard from './pages/AdminBoard'
import OrderDetails from './pages/orderDetails.jsx'
// import axios from 'axios'
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
