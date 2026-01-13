import { NavLink, Link } from "react-router"

function Footer(){
    
    return(
        <footer className="w-full p-6 bg-[#2c3639] mt-12">
            <div>
                 <Link to={'/'} className='cursor-pointer text-[#FFE2AF] hover:text-[#F2D39A] font-semibold text-xl'>Jan'Sports</Link>
            </div>
        </footer>
    )
}
export default Footer