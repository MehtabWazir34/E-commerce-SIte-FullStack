import axios from "axios";
import { useEffect, useState } from "react";
import { BsTrash, BsTrash2, BsTrash2Fill, BsTrash3 } from "react-icons/bs";
import { NavLink } from "react-router";

function MyCart(){
    const [cartItems, setCartItems] = useState([]);
    // console.log(cartItems);
    
    useEffect(()=>{
        const fetchCartItems = async()=>{
            try {
                let theItems = await axios.get("http://localhost:3400/user/mycart",{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                });
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
            let theItem = await axios.delete(`http://localhost:3400/user/deletecartitem/${itemId}`,
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(theItem);
            setCartItems(prev => prev.filter((item)=> item.itemId._id !== itemId))
            
        } catch (error) {
            console.log("Err to delete from cart", error);
            
        }
    }
    return(
        <section className="rounded-xl z-70 p-4 w-2/5 h-8/9 flex flex-col fixed top-14  right-2 bg-[#364145] shadow-lg text-[#ffe2af]">
        <h2 className="text-xl font-semibold mb-1">My Cart</h2>
        <div className="overflow-y-auto flex-1">
            {
                cartItems.length === 0 ? (
                    <div><h2>No item added yet.</h2></div>
                ) 
                : (
                    <div >
                        {
                            cartItems.map((item) => (
    <div 
        key={item._id}
        className="rounded-sm bg-[#2c3639] border flex-1 flex justify-left space-x-2 border-[#ffe2af] my-2  w-full shadow-lg"
    >
        <div>
            { item?.itemId?.Imgs?.length > 0 && (<img src={item?.itemId?.Imgs?.[0]?.startsWith('http') ? item.itemId.Imgs[0] : `http://localhost:3400${item?.itemId?.Imgs?.[0]}`} alt={item?.itemId?.Title} className="w-20 h-20 object-cover m-2" />)}
        </div>
        <NavLink to={`/product/details/${item.itemId._id}`}>

        <h2 className="font-semibold">
            {item.itemId?.Title}
        </h2>

        <p>Price: {item.itemId?.Price}</p>
        <p>Quantity: {item.itemQty}</p>
        </NavLink>
        <div className=" my-1 gap-x-3 grid grid-cols-1 ">
            <button onClick={()=> deleteCartItem(item.itemId._id)} className="px-1 rounded-sm cursor-pointer bg-red-700 text-center  "><BsTrash3/></button>
            <NavLink to={`/placeorder/${item.itemId._id}`} className="px-1 rounded-sm cursor-pointer bg-blue-700 text-center  ">Buy Now</NavLink>
        </div>

        
    </div>
))

                        }
                    </div>
                )
            }
        </div>

        
        { cartItems.length > 0 && (
            <div className="text-right text-lg font-semibold flex justify-between w-full border-t-2 mt-2 border-[#ffe2af] ">
                <h2 className="">
            Cart Total </h2>
            <h2>

                {cartItems.reduce((total, item) => Number(total) + Number(item.itemId?.Price || 0) * Number(item.itemQty), 0)}
            </h2>
            
            </div>
        ) }
        </section>)
}
export default MyCart;