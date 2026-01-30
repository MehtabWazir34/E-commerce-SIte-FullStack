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
//     const imgSrc = item?.itemId?.Imgs?.[0]
//   ? item.itemId.Imgs[0].startsWith('http')
//       ? item.itemId.Imgs[0]
//       : `http://localhost:3400${item.itemId.Imgs[0]}`
//   : '';

    return(
        <section className="rounded-xl z-20 p-4 w-2/5 absolute top-1/9 my-4 right-2 bg-[#2c3639]">
        <h2 className="text-xl font-semibold text-[#FFE2AF] mb-4">My Cart</h2>
        <div>
            {
                cartItems.length === 0 ? (
                    <div><h2>No item added yet.</h2></div>
                ) 
                : (
                    <div>
                        {
                            cartItems.map((item) => (
    <div
        key={item._id}
        className="rounded-sm text-[#ffe2af] border border-[#ffe2af] p-2 w-full shadow-lg"
    >
        <h2 className="font-semibold">
            {item.itemId?.Title}
        </h2>

        <p>Price: {item.itemId?.Price}</p>
        <p>Quantity: {item.itemQty}</p>

        {item.itemId?.Imgs?.length > 0 && (
            <img
                src={item?.itemId?.Imgs?.[0]?.startsWith('http') ? item.itemId.Imgs[0] : `http://localhost:3400${item?.itemId?.Imgs?.[0]}`}
                alt={item.itemId.Title}
                className="w-20 h-20 object-cover mt-2"
            />
        )}
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