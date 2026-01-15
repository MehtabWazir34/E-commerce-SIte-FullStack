
import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Header from './Parts/Header'
import Home from './Pages/Home'
import Footer from './Parts/Footer'

function App() {

  return (
    <>
     <div className='w-full h-full place-items-center'>
      <Header/>
      {/* <h2>Yes, its running.</h2> */}
        <main className='w-full rounded-md shadow-2xl'>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
     
        </main>
        <Footer/>
        
     </div>
    </>
  )
}

export default App
