import axiosInstance from '../Utility/axiosInstance.js'
import { useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { NavLink } from "react-router";

function MyCart({setCartOpen}){
    const [cartItems, setCartItems] = useState([]);
    // console.log(cartItems);
    
    useEffect(()=>{
        const fetchCartItems = async()=>{
            try {
                let theItems = await axiosInstance.get(`/user/mycart`);
                setCartItems(Array.isArray(theItems.data.theItems) ? theItems.data.theItems : []);
                // console.log(theItems);
                
            }
            catch (error) {
                console.log("error to fetch cart items", error);
            }
        }  
        fetchCartItems()      // Fetch cart items from the server 
    },[])
    if(!cartItems) return null;

    const deleteCartItem = async(itemId)=>{
        try {
            let theItem = await axiosInstance.delete(`/user/deletecartitem/${itemId}`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(theItem);
            setCartItems(prev => prev.filter((item)=> item.itemId?._id !== itemId))
            setCartOpen(true)
            
        } catch (error) {
            console.log("Err to delete from cart", error);
            
        }
    }
    return(
        <section className="rounded-3xl z-50 p-6 max-w-full md:w-96 h-[85vh] flex flex-col fixed top-16 right-6 bg-white shadow-xl border border-gray-100 text-gray-800 font-sans antialiased">
        <h2 className="text-lg font-sans font-black mb-4 text-gray-900 uppercase tracking-tight border-b border-gray-100 pb-2">My Cart</h2>
        <div className="overflow-y-auto flex-1 scrollbar-none pr-1">
            {
                cartItems.length === 0 ? (
                    <div className="py-10 text-center"><h2 className="text-gray-400 text-xs font-medium">No item added yet.</h2></div>
                ) 
                : (
                    <div className="space-y-3">
                        {
                            cartItems.map((item) => (
    <div key={item._id}>
        <NavLink data-aos="fade-down" to={`/product/details/${item.itemId?._id}`} onClick={()=> setCartOpen(false)} className="bg-white border border-gray-100 rounded-2xl shadow-sm transition-all hover:shadow-md my-1 w-full flex items-center gap-3 p-3 text-gray-700" >
        <div className="w-16 h-16 shrink-0 bg-gray-50 border border-gray-50 rounded-xl overflow-hidden p-1 flex items-center justify-center mix-blend-multiply">
            { item?.itemId?.Imgs?.length > 0 && (<img src={item?.itemId?.Imgs?.[0]?.startsWith('http') ? item.itemId.Imgs[0] : `${item?.itemId?.Imgs?.[0]}`} alt={item?.itemId?.Title} className="max-h-full max-w-full object-contain rounded-md" />)}
        </div>
        <div className={'w-full flex-1 min-w-0'}>

        <h2 className="font-sans font-bold text-gray-900 text-xs uppercase tracking-tight line-clamp-1">
            {item.itemId?.Title}
        </h2>

        <p className="text-gray-400 text-[11px] font-medium mt-1">Price: <span className="text-purple-600 font-bold">${item.itemId?.Price}</span></p>
        <p className="text-gray-400 text-[11px] font-medium">Qty: <span className="text-gray-700 font-bold">{item.itemQty}</span></p>
        </div>
        <div className="gap-2 flex flex-col shrink-0 [&_a]:text-center">
            <button onClick={(e)=> { e.preventDefault(); deleteCartItem(item.itemId?._id); }} className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer bg-transparent border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50/50 transition-colors"><BsTrash3 className="w-3.5 h-3.5"/></button>
            <NavLink to={`/placeorder/${item.itemId?._id}`} className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700">Buy</NavLink>
        </div>
        </NavLink>
    </div>
))

                        }
                    </div>
                )
            }
        </div>

        
        { cartItems.length > 0 && (
            <div className="text-gray-900 text-sm font-sans font-black flex justify-between w-full mt-4 pt-4 border-t border-gray-100">
                <h2 className="text-gray-400 font-medium">
            Cart Total </h2>
            <h2 className="text-purple-600 text-base">

                ${cartItems.reduce((total, item) => Number(total) + Number(item.itemId?.Price || 0) * Number(item.itemQty), 0)}
            </h2>
            
            </div>
        ) }
        </section>)
}
export default MyCart;