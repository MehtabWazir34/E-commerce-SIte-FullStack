// import  { Link } from 'react-router-dom'
import { InPut, NaVLink } from '../Inputs/InPuts'
import {  useEffect, useState } from 'react'
// import { MdCabin, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
// import { checkLogin } from '../Config/authCheck';
import { useAuth } from '../Config/AuthProvider';
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
        <header data-aos="fade-down" data-aos-duration="300" className="w-full flex justify-between p-6 bg-[#2c3639]">
            <Link data-aos="fade-down" data-aos-duration="400" to={'/'} className='cursor-pointer text-[#FFE2AF] hover:text-[#F2D39A] font-semibold text-xl'>Jan'Sports</Link>
            <nav data-aos="fade-down" data-aos-duration="500" className="md:flex md:justify-between gap-x-4 hidden place-items-center">
            <NaVLink linkedTo={'/'} Name={'Home'}/>
            <NaVLink linkedTo={'/products'} Name={'Products'}/>
            <NaVLink linkedTo={'/about'} Name={'About'}/>
            </nav>

            <div data-aos="fade-down" data-aos-duration="500" className='flex justify-around gap-x-4'>
                <InPut type={'text'} id={'search'} placeholder={'Search item'} value={searchVal} onChange={(a)=> setSearchVal(a.target.value)}/>
            
           
          {/* Cart and Account Buttons */}
          <div className='hidden md:flex md:justify-between gap-x-4'>
            <button data-aos="fade-down" data-aos-duration="600" onClick={cartOpen} className='rounded-sm text-xl bg-[#ffe2af] px-2 cursor-pointer'>{cartIcon}</button>
            {
                loggedIn ? (
                <button data-aos="fade-down" data-aos-duration="600" onClick={()=>accountOpts()} className='text-xl bg-[#ffe2af] rounded-sm px-2 cursor-pointer'><IoSettings/> </button> 
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

