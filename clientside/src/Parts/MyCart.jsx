import axios from "axios";
import { useEffect, useState } from "react";

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
    })
    if(!cartItems) return null;
    // console.log(cartItems);
    
    return(
        <section className="rounded-2xl z-20 p-4 max-w-2/5 absolute top-16 my-4 right-4 bg-[#2c3639]">
        <h2 className="text-xl font-semibold text-[#FFE2AF] mb-4">My Cart</h2>
        <div>
            {
                cartItems.length === 0 ? (
                    <div><h2>No item added yet.</h2></div>
                ) 
                : (
                    <div>
                        {
                            cartItems.map((item, idx)=>(
                                <div key={idx} className="rounded-sm p-2 w-full shadow-lg ">
                                    <h2>{item.itemId}</h2>
                                    <div></div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
            
        </section>
    )
}
export default MyCart;