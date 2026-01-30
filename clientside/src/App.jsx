
import { Route, Routes } from 'react-router'
import './App.css'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Header from './Parts/Header'
import Home from './Pages/Home'
import Footer from './Parts/Footer'
import ScrollToHash from './Parts/ScrollToIds'
import Products from './Pages/Products'
import Details from './Pages/Details'
import About from './Pages/About'
import ShareNewItem from './Pages/ShareNewItem'
import Order from './Pages/Order'
import MyCart from './Parts/MyCart'
import { useState } from 'react'

import { BsCartCheckFill, BsCartXFill } from 'react-icons/bs';
function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
     <div className='w-full h-full place-items-center'>
      <Header cartOpen={()=> setCartOpen(!cartOpen)}
      cartIcon={cartOpen ? (<BsCartXFill/>) : (<BsCartCheckFill/>)} />
      {/* <h2>Yes, its running.</h2> */}
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
          {/* <Route path='/mycart' element={<MyCart/>}/> */}
        </Routes>
     
        </main>
        <ScrollToHash/>
        <Footer/>
     {
       cartOpen && (
         <MyCart/>
       )
     }
        
     </div>
    </>
  )
}

export default App
