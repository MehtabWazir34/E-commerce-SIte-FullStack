import { useRef, useState } from "react";
import { IoMenu, IoSettings } from "react-icons/io5";
import { NaVLink } from "../Inputs/InPuts";
import { BsCartCheckFill, BsCartXFill } from "react-icons/bs";
import { useAuth } from "../Config/AuthProvider";
import AccountOpt from "./AccountOpt";
import MyCart from "./MyCart";
import Draggable from 'react-draggable'
function FloatingMenu() {
//   const nodeRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);  
    const [cartOpn, setCartOpn] = useState(false);
    const [settingOpn, setSettingOpn] = useState(false);

    const {isLoggedIn} = useAuth()
  return (
      <>
            { menuOpen && (
                <div className={`transition-all duration-300 fixed top-0 right-0 py-4 px-2 bg-white shadow-md border border-gray-100 flex justify-between items-center rounded-2xl z-50 font-sans antialiased text-gray-800 w-full ${menuOpen ? 'opacity-100' : "opacity-0 hidden" } `}> 
                    <ul className="flex items-center gap-x-2 text-xs font-bold uppercase tracking-wider ">
                        <li data-aos="fade-right"  data-aos-duration="300">
                            <NaVLink onClick={()=> setMenuOpen(false)} linkedTo={'/'} Name={'Home'}/>
                            </li>
                        <li data-aos="fade-right" data-aos-duration="400">
                        <NaVLink onClick={()=> setMenuOpen(false)} linkedTo={'/products'} Name={'Products'} />
                            </li>
                        <li data-aos="fade-right" data-aos-duration="500">
                        <NaVLink onClick={()=> setMenuOpen(false)} linkedTo={'/about'} Name={'About'} />
                            </li>
                    </ul>
                        <div  className="flex items-center gap-x-3">
                        <button data-aos="fade-right" data-aos-duration="600" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-100 text-purple-600 hover:text-purple-700 border border-gray-100 flex items-center justify-center transition-all cursor-pointer"
                         onClick={()=> setCartOpn(!cartOpn)} >{cartOpn ? <BsCartXFill/> : <BsCartCheckFill/> }
                        </button>
                        { cartOpn && (
                            <MyCart/>
                        )}
                        <button data-aos="fade-right" data-aos-duration="700" className="w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-100 text-purple-600 hover:text-purple-700 border border-gray-100 flex items-center justify-center transition-all cursor-pointer"
                         onClick={()=> setSettingOpn(!settingOpn)} >
                            {isLoggedIn ? <IoSettings/> : <NaVLink linkedTo={'/login'} Name={'Login'}/>}
                        </button>
                        {settingOpn && (
                            <AccountOpt/>
                        )}
                    </div>    
                    
                </div>
            )}]
      <div
        // ref={nodeRef}
        // 
        onClick={()=>setMenuOpen(!menuOpen)}
        className="fixed md:hidden bottom-8 right-4 w-12 h-12 flex items-center justify-center border border-purple-200 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-200 cursor-pointer z-50"
      >
        <IoMenu className="text-xl animate-bounce font-bold"/>
      </div>
    {/* </Draggable> */}
    </>
  );
}
// 
export default FloatingMenu;