import { useState, useEffect } from "react";
import { InPut, LaBel } from "../Inputs/InPuts";
import axiosInstance from '../Utility/axiosInstance.js'
import { useParams } from "react-router";

function Order() {
  const { id } = useParams();

  const [theItem, setTheItem] = useState(null);
  const [qty, setQty] = useState(1);

  const [formData, setFormData] = useState({
    cusName: "",
    cusAdd: "",
    contactNo: "",
    email: ""
  });

  useEffect(() => {
    const getItem = async () => {
      const res = await axiosInstance.get(`/products/${id}`);
      setTheItem(res.data.product);
    };
    getItem();
  }, [id]);

  useEffect(() => {
    const loadUser = async () => {
      const res = await axiosInstance.get(`/user/me`, );

      setFormData(prev => ({
        ...prev,
        cusName: res.data.user.fullName,
        email: res.data.user.email
      }));
    };

    loadUser();
  }, []);

  if (!theItem) return null;

  
  const subTotal = theItem.Price * qty;
  const deliveryFee = theItem.deliveryFee || 0;
  const discount = theItem.offPrice || 0;
  const totalAmount = Number(subTotal) + Number(deliveryFee) - Number(discount);

  const placeOrder = async (e) => {
    e.preventDefault();
    const payload = {
      orderedItem: 
        {
          product: theItem._id,
          productName: theItem.Title,
          productInfo: theItem.Detail,
          qty,
          price: theItem.Price
        }
      ,
      deliveryFee,
      discount,
      shipAdd: formData.cusAdd,
      email: formData.email,
      phoneNo: formData.contactNo
    };

    const res = await axiosInstance.post(
      `/user/order/create`,
      payload,
      
    );
    console.log("Order placed:", res.data);
    alert("Order placed successfully!");
    window.location.href = `/product/details/${theItem._id}`;
  };

  return (
    <section className="max-w-7xl min-h-screen mx-auto bg-transparent mt-8 p-4 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans antialiased text-gray-800">
      
      {/* Structural Order Summary Layout Panel Container */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between max-h-fit">
        <div>
          <h2 className="text-lg font-sans font-black text-gray-900 uppercase tracking-tight border-b border-gray-100 pb-3 w-full">Order Summary</h2>
          <div className="mt-5 space-y-4 text-xs font-medium text-gray-500">
            <h4 className="text-sm font-sans font-bold text-gray-800 uppercase tracking-tight">
              <span className="text-gray-400 font-sans normal-case block text-xs font-medium mb-0.5">Product</span> 
              {theItem?.Title}
            </h4>
            
            <h4 className="text-sm font-sans font-bold text-gray-800">
              <span className="text-gray-400 font-sans normal-case block text-xs font-medium mb-0.5">Price</span> 
              <span className="text-gray-900">${theItem?.Price}</span>
            </h4>
            
            <div className="text-sm font-sans font-bold text-gray-800 flex flex-col gap-y-1">
              <span className="text-gray-400 font-sans normal-case text-xs font-medium">Quantity</span> 
              <div className="flex items-center gap-x-3 mt-1">
                <button 
                  type="button"
                  className={`${qty === 1 ? 'cursor-not-allowed bg-gray-100 text-gray-300' : 'cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600'} w-8 h-8 rounded-xl text-center font-bold flex items-center justify-center transition-all text-base border border-transparent`} 
                  onClick={()=> setQty(qty > 1 ? qty -1 : qty)}
                >
                  −
                </button> 
                <span className="text-gray-900 font-sans font-bold min-w-6 text-center text-xs">{qty > 9 ? qty : `0${qty}`}</span> 
                <button 
                  type="button"
                  className="w-8 h-8 bg-gray-100 rounded-xl text-center cursor-pointer hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center transition-all text-base" 
                  onClick={()=> setQty(qty + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <h4 className="text-sm font-sans font-bold text-gray-800">
              <span className="text-gray-400 font-sans normal-case block text-xs font-medium mb-0.5">Delivery</span> 
              <span className="text-gray-900">${theItem?.deliveryFee}</span>
            </h4>
            
            <h4 className="text-sm font-sans font-bold text-gray-800">
              <span className="text-gray-400 font-sans normal-case block text-xs font-medium mb-0.5">Discount</span> 
              <span className="text-purple-600">-${theItem?.offPrice}</span>
            </h4>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-6 flex justify-between items-center">
          <span className="text-gray-400 text-xs font-medium">Total Amount</span>
          <span className="text-xl font-sans font-black text-purple-600">${totalAmount}</span>
        </div>
      </div>

      {/* Checkout Shipping Intake Input Layout Component Panel Container */}
      <form onSubmit={placeOrder} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="mb-6">
          <h2 className="text-lg text-gray-900 font-sans font-black uppercase tracking-tight border-b border-gray-100 pb-3">Shipping Details</h2>
        </div>
          
        {/* Dynamic Multi-Input Checklist Structural Row Properties */}
        <div className="grid grid-cols-1 gap-4 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-400 [&_input]:bg-gray-50 [&_input]:border-transparent [&_input]:rounded-xl [&_input]:text-sm [&_input]:py-2.5 focus-within:[&_input]:border-purple-300 focus-within:[&_input]:bg-white">
            <div className="flex flex-col w-full gap-1">
              <LaBel lblFor={'Name'} lblName={'Your Name'} />
              <InPut type={'text'} placeholder={'Your Name'} id={'Name'} value={formData.cusName} onChange={(a)=> setFormData({...formData, cusName: a.target.value})} />
            </div>

            <div className="flex flex-col w-full gap-1">
              <LaBel lblFor={'email'} lblName={'Your Email'} />
              <InPut type={'email'} placeholder={'Your Email'} id={'email'} value={formData.email} onChange={(a)=> setFormData({...formData, email: a.target.value})} />
            </div>
            
            <div className="flex flex-col w-full gap-1">
              <LaBel lblFor={'phoneNo'} lblName={'Phone Number'} />
              <InPut type={'digit'} placeholder={'Your Phone Number'} id={'phoneNo'} value={formData.contactNo} onChange={(a)=> setFormData({...formData, contactNo: a.target.value})} />
            </div>
        </div>

        <div className="flex flex-col gap-1 [&_label]:text-xs [&_label]:font-bold [&_label]:text-gray-400">
          <LaBel lblFor={'address'} lblName={'Shipping Address'} />
          <textarea 
            rows={4} 
            cols={2} 
            className="w-full p-3 outline-none bg-gray-50 text-gray-700 border border-transparent rounded-xl focus:border-purple-300 focus:bg-white transition-all font-medium text-sm" 
            placeholder="Your Address" 
            id="address" 
            value={formData.cusAdd} 
            onChange={(a)=> setFormData({...formData, cusAdd: a.target.value})}
          > 
          </textarea>
        </div>

        <div className="w-full flex justify-center pt-4">
          <button type="submit" className="w-full px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 cursor-pointer">
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}

export default Order;