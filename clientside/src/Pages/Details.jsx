import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function Details() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  // console.log(item._id);
  // console.log(id);
  
  let navigateTo = useNavigate();
  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/products/${id}`);
        const product = res.data.product;

        setItem(product);
        setMainImg(product?.Imgs?.[0]); // first image as main
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getItem();
  }, [id]);

  const addItem = {
      "itemId" : id,
      "itemQty": quantity
  }
  const addToCart = async()=>{
    try {
          let theItemToadd = await axios.post('http://localhost:3400/user/addtocart',
            addItem,
          {
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          }
          );
          console.log(theItemToadd);
                
    } catch (error) {
      console.log("error to add item", error);
      
    }
  }

  if (!item) return null;

  const price = item?.Price || 0;
  const discount = item?.offPrice || 0;
  const deliveryFee = item?.deliveryFee || 0;
  const subtotal = price * quantity - discount;
  const total = Number(subtotal) + Number(deliveryFee);

  return (
    <section className="max-w-10/11 min-h-10/11 mt-8 rounded-2xl p-4 mx-auto bg-[#2c3639]">

      <div className="max-w-full flex flex-col md:grid md:grid-cols-2 gap-6 mt-4">
        {/* Images Section */}
        <div className="w-full md:w-7/12 shadow-2xl rounded-2xl p-4">
          {/* Main Image */}
          <div className="w-full rounded-xl overflow-hidden">
            <img
              src={mainImg.startsWith('http') ? mainImg : `http://localhost:3400${mainImg}`}
              alt={item.Title}
              className="w-full h-80 object-cover rounded-xl transition-all duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 sm:place-items-center sm:flex sm:justify-center gap-3 mt-4">
            {item.Imgs?.map((img, index) => (
              <img
                key={index}
                src={img.startsWith('http') ? img : `http://localhost:3400${img}`}
                alt="thumbnail"
                onClick={() => setMainImg(img)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border transition-all duration-300
                  ${
                    mainImg === img
                      ? "border-[#ffe2af] scale-105 cursor-pointer"
                      : "border-transparent hover:border-[#ffe2af]"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full flex flex-1 flex-col rounded-2xl shadow-2xl p-4 text-left text-[#ffe2af]">
          <div className="border-b-2 pb-4 mb-4 wrap-break-word overflow-hidden"> 
            <h2 className="text-2xl font-bold ">{item.Title}</h2>
            <p className="text-sm opacity-80 mt-2">
              {item.Detail}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4">
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex-1 cursor-pointer rounded-md p-2 font-bold bg-red-600 hover:bg-red-700 transition"
                >
                  −
                </button>

                <span className="px-4 font-bold text-lg">{quantity < 10 ? `0${quantity}` : quantity}</span>

                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex-1 cursor-pointer rounded-md p-2 font-bold bg-green-600 hover:bg-green-700 transition"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button onClick={()=> addToCart(id)} className="flex-1 cursor-pointer rounded-md p-2 border font-semibold hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button onClick={() => navigateTo(`/placeorder/${item._id}`)} className="flex-1 cursor-pointer rounded-md p-2 border font-semibold bg-blue-600 hover:bg-blue-700 transition">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Price Info */}
            <div className="text-sm">
              <div className="flex justify-between">
              <h2 className="my-1">Price</h2>
              <h2 className="my-1">{price}</h2>
              </div>
              <div className="flex justify-between">
              <h2 className="my-1">Quantity</h2>
              <h2 className="my-1">{quantity > 9 ? quantity : `0${quantity}`}</h2>
              </div>
              <div className="flex justify-between">
              <h2 className="my-1">Discount</h2>
              <h2 className="my-1"> {discount > 9 ? discount : `00`}</h2>
              </div>
              <div className="flex justify-between">
              <h2 className="my-1">Delivery</h2>
              <h2 className="my-1">{deliveryFee > 9 ? deliveryFee : '00'}</h2>
              </div>

              <div className="flex justify-between border-t-2 mt-2 pt-2 font-bold text-lg">
                <h2 className="my-1">Total</h2>
                <h2 className="my-1">{total}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Details;
