import  { Link, NavLink } from 'react-router-dom'
import { InPut } from '../Inputs/InPuts'
import { useState } from 'react'
function Header(){
    let [search, setSearch] = useState('')

    return(
        <header className="w-full flex justify-between p-6 bg-[#2c3639]">
            <Link to={'/'} className='cursor-pointer text-[#FFE2AF] hover:text-[#F2D39A] font-semibold text-xl'>Jan'Sports</Link>
            <nav className="flex justify-between gap-x-4">
            <NavLink to={'/'} className={'cursor-pointer px-2 text-center py-1 bg-[#ffe2af] rounded-full outline-0 hover:bg-[#F2D39A] text-[#2C3639] font-semibold'}>Home</NavLink>
            <NavLink to={'/products'} className={'cursor-pointer px-2 text-center py-1 bg-[#ffe2af] rounded-full outline-0 hover:bg-[#F2D39A] text-[#2C3639] font-semibold'}>Products</NavLink>
            <NavLink to={'/about'} className={'cursor-pointer px-2 text-center py-1 bg-[#ffe2af] rounded-full outline-0 hover:bg-[#F2D39A] text-[#2C3639] font-semibold'}>About</NavLink>
            </nav>

            <div className='flex justify-around gap-x-4'>
                <InPut type={'text'} id={'search'} placeholder={'Search item'} value={search} onChange={(a)=> setSearch(a.target.value)}/>

                <div className='flex justify-between gap-x-4'>
            <NavLink to={'/register'} className={'cursor-pointer px-2 text-center py-1 bg-[#ffe2af] rounded-full outline-0 hover:bg-[#F2D39A] text-[#2C3639] font-semibold'}>Register account</NavLink>
            <NavLink to={'/login'} className={'cursor-pointer px-2 text-center py-1 bg-[#ffe2af] rounded-full outline-0 hover:bg-[#F2D39A] text-[#2C3639] font-semibold'}>Login</NavLink>
                    
                </div>
            </div>
        </header>
    )
}
export default Header