import axiosInstance from '../Utility/axiosInstance.js'
import { useState } from "react";
import { MdAddBusiness, MdLogout, MdOutlinePerson, } from "react-icons/md"
import { ImHistory } from "react-icons/im"
import { RiAdminLine } from 'react-icons/ri'
import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../Config/AuthProvider";
import { useUser } from "../Utility/THEUser";

function AccountOpt({setAccOpts}){
    const {theUser} = useUser()
    let navigateTo = useNavigate();
    const {setLoggedIn} = useAuth()
    const Logout = async()=>{
        try {
            await axiosInstance.post(`/user/logout`,{}
            )
            setTimeout(()=>{
                setAccOpts(false);
                setLoggedIn(false);
                navigateTo('/login');
            }, 500)
            localStorage.removeItem('token')
        } catch (error) {
            console.log("Failed to log out", error);
            
        }
    }
    
    return(
        <section className="w-1/2 md:w-1/3 lg:w-1/6 flex flex-col space-y-2 rounded-2xl bg-[#364145] p-2 fixed top-16 right-2 shadow-lg text-[#ffe2af]">

    <NavLink
        data-aos="fade-down" data-aos-duration="300"
        to="/myaccount"
        onClick={()=>setAccOpts(false)}
        className="flex items-center gap-2 text-xl font-semibold p-2 rounded-2xl 
                   hover:bg-[#ffe2af] hover:text-[#2c3639] transition-all duration-300"
    >
        <MdOutlinePerson />
        My Account
    </NavLink>
    <NavLink
        // data-aos="fade-down" data-aos-duration='400'
        to="/adminboard"
        onClick={()=>setAccOpts(false)}
        className={`${theUser?.role !== 'admin' ? 'hidden' : 'flex'}  items-center gap-2 text-xl font-semibold p-2 rounded-2xl 
                   hover:bg-[#ffe2af] hover:text-[#2c3639] transition-all duration-300`}
    >
        <RiAdminLine />
        Admin Board
    </NavLink>
    <NavLink
        data-aos="fade-down" data-aos-duration="400"
        to="/addnewitem"
        onClick={()=>setAccOpts(false)}
        className={`${theUser?.role !== 'admin' ? 'hidden' : 'flex'}  items-center gap-2 text-xl font-semibold p-2 rounded-2xl 
                   hover:bg-[#ffe2af] hover:text-[#2c3639] transition-all duration-300`}
    >
        <MdAddBusiness />
        Add New Item
    </NavLink>
    <NavLink
        data-aos="fade-down" data-aos-duration="500"
        to="/myorders"
        onClick={()=>setAccOpts(false)}
        className={`${theUser?.role !== 'admin' ? 'hidden' : 'flex'}  items-center gap-2 text-xl font-semibold p-2 rounded-2xl 
                   hover:bg-[#ffe2af] hover:text-[#2c3639] transition-all duration-300`}
    >
        <ImHistory />
        My Orders
    </NavLink>

    <button
        data-aos="fade-down" data-aos-duration="600"
        onClick={Logout}
        className="flex items-center cursor-pointer gap-2 text-xl font-semibold p-2 rounded-2xl 
                   hover:bg-[#ffe2af] hover:text-[#2c3639] transition-all duration-300 
                   text-left"
    >
        <MdLogout />
        Logout
    </button>

</section>

    )
}
export default AccountOpt