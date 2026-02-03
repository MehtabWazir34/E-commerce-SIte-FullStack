import  { Link } from 'react-router-dom'
import { InPut, NaVLink } from '../Inputs/InPuts'
import {  useState } from 'react'
// import { MdCabin, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
// import { checkLogin } from '../Config/authCheck';
import { useAuth } from '../Config/AuthProvider';

function Header({cartOpen, cartIcon, accountOpts}){
    const [search, setSearch] = useState('')

    const {isLoggedIn, Loading} = useAuth();
    
    // let navigateTo = useNavigate()
    // useEffect(()=>{
    //     let initCheck = async()=>{
            
    //         const verified = await checkLogin();
    //         // setVerified(verified);
    //         if(!verified){
    //             // localStorage.removeItem('token');
    //             setTimeout(()=>{
    //                 navigateTo('/login')
    //             }, 300);
    //         }
    //     }
    // initCheck()
    // },[])

    // if(Loading) return <h2 className='text-center mx-auto my-20 text-2xl'>Loading...</h2>
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
                isLoggedIn ? (
                <button onClick={()=>accountOpts()} className='text-xl bg-[#ffe2af] rounded-sm px-2 cursor-pointer'><IoSettings/> </button> 
                ) : (
                <NaVLink linkedTo={'/login'} Name={'Login'}/>
                )
            }
                    
                </div>
            </div>
        </header>
    )
}
export default Header