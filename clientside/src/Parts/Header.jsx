// import  { Link } from 'react-router-dom'
import { InPut, NaVLink } from '../Inputs/InPuts'
import {  useEffect, useState } from 'react'
// import { MdCabin, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
// import { checkLogin } from '../Config/authCheck';
// import { useAuth } from '../Config/AuthProvider';
import axiosInstance from '../Utility/axiosInstance.js';
import { Link } from 'react-router';
import { useUser } from '../Utility/THEUser.jsx';

function Header({cartOpen, cartIcon, accountOpts, setSearchMode, setFilteredItems, searchVal, setSearchVal}) {
    // const [search, setSearch] = useState('')
    // const [searchMode, setSearchMode] = useState(false)
    const [products, setProducts] = useState([]);
    // const [FilteredItems, setFilteredItems] = useState([]);

    const {loggedIn} = useUser();
    useEffect(()=>{
        const getRes = async()=>{
        try {
            const rsp = await axiosInstance.get(`/products/`);
            setProducts(rsp.data.products);
            setFilteredItems(rsp.data.products)
        } catch (error) {
            console.log("Err:", error);  
        }}
      getRes()  
    },[searchVal, setFilteredItems])

useEffect(() => {
    if(!products || products.length === 0) return;
    const searchRes = products.filter((itm)=> itm.Title.toLowerCase().includes(searchVal.toLocaleLowerCase()))

    setFilteredItems(searchRes);
    if(searchVal.trim() !==''){
    setSearchMode(true)
    } else {
        setSearchMode(false)
    }
},[searchVal, products]);


    return(
        <header data-aos="fade-down" data-aos-duration="300" className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
            {/* Brand Logo styled exactly like the reference 'MLC' */}
            <Link data-aos="fade-down" data-aos-duration="400" to={'/'} className='cursor-pointer text-gray-900 font-sans font-black text-2xl uppercase tracking-tighter transition-colors duration-150'>
                Jan'Sports
            </Link>
            
            {/* Nav links positioned cleanly between logo and controls */}
            <nav data-aos="fade-down" data-aos-duration="500" className="md:flex md:justify-between gap-x-6 hidden place-items-center text-sm font-medium text-gray-600">
                <NaVLink linkedTo={'/'} Name={'Home'}/>
                <NaVLink linkedTo={'/products'} Name={'Products'}/>
                <NaVLink linkedTo={'/about'} Name={'About'}/>
            </nav>

            <div data-aos="fade-down" data-aos-duration="500" className='flex flex-1 max-w-md mx-8 items-center relative'>
                {/* Search wrapper matching the full width rounded input field from the image */}
                <div className="w-full relative [&_input]:w-full [&_input]:bg-white  [&_input]:text-sm [&_input]:pl-6 [&_input]:pr-4 [&_input]:py-2.5 [&_input]:rounded-full [&_input]:border [&_input]:focus:outline-none [&_input]:focus:bg-white [&_input]:focus:border-purple-200 [&_input]:transition-all [&_input]:placeholder-gray-400">
                    <InPut type={'text'} id={'search'} placeholder={'Search'} value={searchVal} onChange={(a)=> setSearchVal(a.target.value)}/>
                </div>
            </div>
            
            {/* Right side controls matching clean, purple accents and text hierarchy */}
            <div className='hidden md:flex md:justify-between items-center gap-x-6 text-gray-600 font-medium text-sm'>
                <button 
                    data-aos="fade-down" 
                    data-aos-duration="600" 
                    onClick={cartOpen} 
                    className='  flex items-center gap-1.5 hover:text-purple-600 transition-colors bg-transparent p-0 text-gray-600 font-medium'
                >
                    <span className="relative w-8 h-8 rounded-full bg-gray-100 flex items-center text-purple-600 hover:text-purple-700 hover:bg-purple-100 cursor-pointer [&_svg]:w-8 [&_svg]:h-5">{cartIcon}</span>
                    
                </button>

                {
                    loggedIn ? (
                        <button 
                            data-aos="fade-down" 
                            data-aos-duration="600" 
                            onClick={()=>accountOpts()} 
                            className='w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-100 text-purple-600 hover:text-purple-700 border border-gray-100 flex items-center justify-center transition-all cursor-pointer'
                        >
                            <IoSettings className="w-5 h-5"/> 
                        </button> 
                    ) : (
                        <div className="hover:text-purple-600 transition-colors">
                            <NaVLink linkedTo={'/login'} Name={'Login'}/>
                        </div>
                    )
                }
            </div>
        </header>
    )
}
export default Header