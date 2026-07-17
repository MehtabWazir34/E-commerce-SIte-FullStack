import axiosInstance from '../Utility/axiosInstance.js'
// import { useState } from "react";
import { MdAddBusiness, MdLogout, MdOutlinePerson, } from "react-icons/md"
import { ImHistory } from "react-icons/im"
import { RiAdminLine } from 'react-icons/ri'
import { NavLink, useNavigate } from "react-router"
// import { useAuth } from "../Config/AuthProvider";
import { useUser } from "../Utility/THEUser";

function AccountOpt({setAccOpts}){
    const {theUser, setUser} = useUser()
    let navigateTo = useNavigate();
    // const {setLoggedIn} = useAuth()
    const handleLogout = async()=>{
        try {
            await axiosInstance.post(`/user/logout`,{})
            setTimeout(()=>{
                setUser(null);
                // setLoggedIn(false);
                setAccOpts(false);
                navigateTo('/login');
            }, 300)
            localStorage.removeItem('token')
        } catch (error) {
            console.log("Failed to log out", error);
            
        }
    }
    
    return(
        <section className="w-64 flex flex-col space-y-1 rounded-3xl bg-white border border-gray-100 p-2 fixed top-16 right-6 shadow-md text-purple-500 font-sans antialiased z-50">

    <NavLink
        data-aos="fade-down" data-aos-duration="300"
        to="/myaccount"
        onClick={()=>setAccOpts(false)}
        className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider p-3 rounded-2xl 
                   hover:bg-purple-100 hover:text-purple-700 text-purple-600 transition-all "
    >
        <MdOutlinePerson className='text-purple-600 w-5 h-5' />
        My Account
    </NavLink>
    <NavLink
        // data-aos="fade-down" data-aos-duration='400'
        to="/adminboard"
        onClick={()=>setAccOpts(false)}
        className={`${theUser?.role !== 'admin' ? 'hidden' : 'flex'}  items-center gap-3 text-xs font-bold uppercase tracking-wider p-3 rounded-2xl 
                   hover:bg-purple-100 hover:text-purple-700 transition-all text-purple-600`}
    >
        <RiAdminLine className='text-purple-600 w-5 h-5' />
        Admin Board
    </NavLink>
    <NavLink
        data-aos="fade-down" data-aos-duration="400"
        to="/addnewitem"
        onClick={()=>setAccOpts(false)}
        className={`${theUser?.role !== 'admin' ? 'hidden' : 'flex'}  items-center gap-3 text-xs font-bold uppercase tracking-wider p-3 rounded-2xl 
                   hover:bg-purple-100 text-purple-600 transition-all [&_svg]:text-lg hover:text-purple-600`}
    >
        <MdAddBusiness className='text-purple-600 w-5 h-5'/>
        Add New Item
    </NavLink>
    <NavLink
        data-aos="fade-down" data-aos-duration="500"
        to="/myorders"
        onClick={()=>setAccOpts(false)}
        className={`${theUser?.role !== 'admin' ? 'hidden' : 'flex'}  items-center gap-3 text-xs font-bold uppercase tracking-wider p-3 rounded-2xl 
                   hover:bg-purple-100 text-purple-600 transition-all [&_svg]:text-lg hover:text-purple-700`}
    >
        <ImHistory className='text-purple-600 w-5 h-5'/>
        My Orders
    </NavLink>

    <button
        data-aos="fade-down" data-aos-duration="600"
        onClick={handleLogout}
        className="flex items-center cursor-pointer gap-3 text-xs font-bold uppercase tracking-wider p-3 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all text-left bg-transparent border-none w-full [&_svg]:text-lg [&_svg]:text-gray-400 hover:[&_svg]:text-red-600"
    >
        <MdLogout />
        Logout
    </button>

</section>

    )
}
export default AccountOpt