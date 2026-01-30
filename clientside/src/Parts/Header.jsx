import  { Link, NavLink } from 'react-router-dom'
import { InPut, NaVLink } from '../Inputs/InPuts'
import { useState } from 'react'
import { MdCabin, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { BsCartCheckFill, BsCartXFill } from 'react-icons/bs';

function Header({cartOpen, cartIcon}){
    const [search, setSearch] = useState('')
    // const [cartOpen, setCartOpen] = useState(false);


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
            <NaVLink linkedTo={'login'} Name={'Login'}/>
            <button onClick={cartOpen} className='rounded-sm text-xl bg-[#ffe2af] px-2 cursor-pointer'>{cartIcon}</button>
            {/* <NaVLink linkedTo={'mycart'} Name={`${<BsCartCheckFill /> <BsCartXFill/>}`}/> */}
                    
                </div>
            </div>
        </header>
    )
}
export default Header