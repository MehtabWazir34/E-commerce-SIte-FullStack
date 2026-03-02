// import  { Link } from 'react-router-dom'
import { InPut, NaVLink } from '../Inputs/InPuts'
import {  useEffect, useState } from 'react'
// import { MdCabin, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { IoSettings } from 'react-icons/io5';
// import { checkLogin } from '../Config/authCheck';
import { useAuth } from '../Config/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router';

function Header({cartOpen, cartIcon, accountOpts}){
    const [search, setSearch] = useState('')
    const [searchMode, setSearchMode] = useState(false)
    const [products, setProducts] = useState([]);
    const [FilteredItems, setFilteredItems] = useState([]);

    const {isLoggedIn, Loading} = useAuth();
    useEffect(()=>{
        const getRes = async()=>{
        try {
            const rsp = await axios.get('http://localhost:3400/products/');
            setProducts(rsp.data.products);
            setFilteredItems(rsp.data.products)
        } catch (error) {
            console.log("Err:", error);  
        }}
      getRes()  
    },[])
    useEffect(() => {
    const filtered = products.filter((item) =>
        item.Title.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredItems(filtered);
    if(search.trim() !==''){
    setSearchMode(true)
    } else {
        setSearchMode(false)
    }
}, [search, products]);

    const linkClick = ()=>{
        setSearch('');
        setSearchMode(false);
    }
    // console.log("PP", FilteredItems);
    
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
            
           {searchMode && (
  <section className="fixed top-16 inset-0 z-50 bg-black/70 flex justify-center pt-6 px-4">
    
    <div className="w-full max-w-7xl bg-[#2c3639] rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
      
      {FilteredItems.length === 0 ? (
        <p className="text-center text-gray-300 py-10">
          No product found.
        </p>
      ) : (
        <div className="grid gap-6 
                        grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:grid-cols-5">
          
          {FilteredItems.map((item) => (
            <Link
              key={item._id}
              to={`/product/details/${item._id}`}
              onClick={linkClick}
              className="bg-[#f2d39a] rounded-2xl 
                         hover:scale-105 transition duration-300 
                         shadow-md"
            >
              
              {/* Image */}
              <div className="relative h-40">
                <span
                  title="Add to favourite"
                  className="absolute top-2 left-2 z-10 
                             bg-white text-red-600 
                             px-2 rounded-full 
                             hover:bg-red-600 hover:text-white transition"
                >
                  ♥
                </span>

                <img
                  src={
                    item.Imgs?.[0]?.startsWith("http")
                      ? item.Imgs[0]
                      : `http://localhost:3400${item.Imgs?.[0] || ""}`
                  }
                  alt={item.Title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
              </div>

              {/* Content */}
              <div className="p-3 text-[#2c3639]">
                <h3 className="font-bold text-sm line-clamp-2">
                  {item.Title}
                </h3>
                <p className="font-semibold mt-1">
                  Rs. {item.Price}
                </p>
                <p className="text-xs mt-1">
                  Reviews: ⭐⭐⭐
                </p>
              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  </section>
)}
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

