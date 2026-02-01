import axios from "axios";
import { useState } from "react";
import { MdLogout, MdOutlinePerson } from "react-icons/md"
import { NavLink, useNavigate } from "react-router"
import { useAuth } from "../Config/AuthProvider";

function AccountOpt({setAccOpts}){
    // const [isVerified, setVerified] = useState(false)
    let navigateTo = useNavigate();
    const {setLoggedIn} = useAuth()
    const Logout = async()=>{
        try {
            await axios.post('http://localhost:3400/user/logout',{},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            setAccOpts(false)
            setLoggedIn(false)
            setTimeout(()=>{
                // setOptions,
                navigateTo('/login');
            }, 500)
            localStorage.removeItem('token')
        } catch (error) {
            console.log("Failed to log out", error);
            
        }
    }
    return(
        <section className="w-1/6 h-1/5 flex flex-col space-y-2 rounded-2xl bg-[#364145] p-2 fixed top-16 right-2 shadow-lg text-[#ffe2af]">

    <NavLink
        to="/myaccount"
        onClick={()=>setAccOpts(false)}
        className="flex items-center gap-2 text-xl font-semibold p-2 rounded-2xl 
                   hover:bg-[#ffe2af] hover:text-[#2c3639] transition-all duration-300"
    >
        <MdOutlinePerson />
        My Account
    </NavLink>

    <button
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