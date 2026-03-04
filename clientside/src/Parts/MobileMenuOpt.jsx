// import Draggable from "react-draggable";
import { useRef, useState } from "react";
import { IoMenu, IoSettings } from "react-icons/io5";
import { NaVLink } from "../Inputs/InPuts";
import { BsCartCheckFill, BsCartXFill } from "react-icons/bs";
import { useAuth } from "../Config/AuthProvider";
import AccountOpt from "./AccountOpt";
import MyCart from "./MyCart";
import Draggable from 'react-draggable'
function FloatingMenu() {
  const nodeRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);  
    const [cartOpn, setCartOpn] = useState(false);
    const [settingOpn, setSettingOpn] = useState(false);

    const {isLoggedIn} = useAuth()
  return (
      <>
            { menuOpen && (
                <div className="fixed top-0 right-0 place-items-center py-6 w-full bg-[#2c3936] flex justify-around rounded-md p-4"> 
                    <ul className="flex justify-around gap-x-3">
                        <li>
                            <NaVLink onClick={()=> setMenuOpen(false)} linkedTo={'/'} Name={'Home'}/>
                            </li>
                        <li>
                        <NaVLink onClick={()=> setMenuOpen(false)} linkedTo={'/products'} Name={'Products'} />
                            </li>
                        <li>
                        <NaVLink onClick={()=> setMenuOpen(false)} linkedTo={'/about'} Name={'About'} />
                            </li>
                    </ul>
                        <div className="flex justify-between gap-x-4">
                        <button className="bg-[#f2d39a] py-1 px-2 text-xl rounded-sm text-center"
                         onClick={()=> setCartOpn(!cartOpn)} >{cartOpn ? <BsCartXFill/> : <BsCartCheckFill/> }
                        </button>
                        { cartOpn && (
                            <MyCart/>
                        )}
                        <button className="bg-[#f2d39a] py-1 px-2 text-xl rounded-sm text-center"
                         onClick={()=> setSettingOpn(!settingOpn)} >
                            {isLoggedIn ? <IoSettings/> : <NaVLink linkedTo={'/login'} Name={'Login'}/>}
                        </button>
                        {settingOpn && (
                            <AccountOpt/>
                        )}
                    </div>    
                    
                </div>
            )}
    <Draggable nodeRef={nodeRef} onStop={(a, data)=>{ if(data.deltaX === 0 && data.deltaY === 0) {setMenuOpen(pre => !pre)}}} >
      <div
        ref={nodeRef}
        className="fixed bottom-10 right-10 w-12 h-12 flex items-center justify-center border-4 border-[#2c3936] rounded-full bg-[#f2d39a] shadow-2xl cursor-grab z-9999"
      >
        <IoMenu className="text-xl animate-bounce font-bold"/>
      </div>
    </Draggable>
    </>
  );
}

export default FloatingMenu;