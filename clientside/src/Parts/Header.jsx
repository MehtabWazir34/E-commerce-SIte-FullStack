import  { Link, NavLink, useNavigate } from 'react-router-dom'
import { InPut, NaVLink } from '../Inputs/InPuts'
import { useState } from 'react'
import { MdCabin, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
import { checkLogin } from '../Config/authCheck';

function Header({cartOpen, cartIcon, accOpts}){
    const [search, setSearch] = useState('')
    // const [cartOpen, setCartOpen] = useState(false);
    let navigateTo = useNavigate()
    const isLoggedIn = async()=>{
        try {
            let verified = await checkLogin();
            if(!verified){
                localStorage.removeItem('token');
                navigateTo('/login');
            }
        } catch (error) {
            console.log("Error to chechAuth", error);
            
        }
    }

    return(
        <header className="w-full flex justify-between p-6 bg-[#2c3639]">
            <Link to={'/'} className='cursor-pointer text-[#FFE2AF] hover:text-[#F2D39A] font-semibold text-xl'>Jan'Sports</Link>
            <nav className="md:flex md:justify-between gap-x-4 hidden place-items-center">
            <NaVLink linkedTo={'/'} Name={'Home'}/>
            <NaVLink linkedTo={'/products'} Name={'Products'}/>
            <NaVLink linkedTo={'/about'} Name={'About'}/>
            </nav>

            <div className='flex justify-around gap-x-4'>
                <InPut type={'text'} id={'search'} placeholder={'Search item'} value={search} onChange={(a)=> setSearch(a.target.value)}/>

                <div className='hidden md:flex md:justify-between gap-x-4'>
            <button onClick={cartOpen} className='rounded-sm text-xl bg-[#ffe2af] px-2 cursor-pointer'>{cartIcon}</button>
            {
                isLoggedIn ? <button onClick={accOpts} className='text-xl bg-[#ffe2af] rounded-sm px-2 cursor-pointer'><IoSettings/> </button> : 
            <NaVLink linkedTo={'login'} Name={'Login'}/>
            }
            {/* <NaVLink linkedTo={'mycart'} Name={`${<BsCartCheckFill /> <BsCartXFill/>}`}/> */}
                    
                </div>
            </div>
        </header>
    )
}
export default Header