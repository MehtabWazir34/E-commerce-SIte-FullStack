import { NavLink, Link } from "react-router"

function Footer(){
    
    return(
        <footer className="w-full p-6 bg-[#2c3639] mt-12 sticky bottom-0 left-0">
            <div>
                 <Link to={'/'} className='cursor-pointer text-[#FFE2AF] hover:text-[#F2D39A] font-semibold text-xl'>Jan'Sports</Link>
                 <div className="w-1/6">
                    <h2>Connect with Us!</h2>
                    <div className=" flex justify-between">
                        <NavLink to={'/tiktok.com'} className={'bg-amber-500 rounded-full px-2'}><span>TikTok</span></NavLink>
                        <NavLink to={'/tiktok.com'} className={'bg-amber-500 rounded-full px-2'}><span>TikTok</span></NavLink>
                        <NavLink to={'/tiktok.com'} className={'bg-amber-500 rounded-full px-2'}><span>TikTok</span></NavLink>
                    </div>
                 </div>
            </div>
        </footer>
    )
}
export default Footer