import axios from "axios";
import { useEffect, useState } from "react";

function MyCart(){
    const [cartItems, setCartItems] = useState([]);
    useEffect(()    =>{
        const fetchCartItems = async()=>{
            try {
                let theCartItems = await axios.get('http://localhost:3400/user/mycart')
                    setCartItems(theCartItems.data)
                    console.log(theCartItems);
                    
            }
            catch (error) {
                console.log("error to fetch cart items", error);
            }
        }  
        fetchCartItems()      // Fetch cart items from the server 
    })

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
                            cartItems.map((item)=>(
                                <div key={item._id}>
                                    <h2>Items show here</h2>
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