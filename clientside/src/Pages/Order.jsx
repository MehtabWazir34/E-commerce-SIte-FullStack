// import { useState } from "react"
// import {InPut, LaBel} from '../Inputs/InPuts';
// import { useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router";
// function Order(){

//     const [formData, setFormData] = useState({
//         cusName:"", cusAdd:"", contactNo:"", email:""
//     });
//     let {id} = useParams();
//     let [theItem, setTheItem] = useState(null);
//     useEffect(()=>{
//         const getItem = async()=>{
//             try {
//                 let theItem = await axios.get(`http://localhost:3400/products/${id}`);
//                 setTheItem(theItem.data.product);
//                 // console.log("order item details:", theItem.data.product);
//             } catch (error) {
//                 console.log("error to get order details:", error);
                
//             }
//         }
//         getItem()
//     },[id])

//     const placeOrder = async()=>{
//         try {
//             const theOrder = await axios.post('http://localhost:3400/user/order/create',{},
//                 {headers:{
//                     Authorization:`Bearer ${localStorage.getItem('token')}`
//                 }}
//             );
//             console.log(theOrder);
            
//         } catch (error) {
//             console.log("error to place order:", error);
//         }
//     }

//     if(!theItem) return null;
//     return(
        

            

            

            //  </form>
//         </section>
//     )
// }
// export default Order
import { useState, useEffect } from "react";
import { InPut, LaBel } from "../Inputs/InPuts";
import axios from "axios";
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
      const res = await axios.get(`http://localhost:3400/products/${id}`);
      setTheItem(res.data.product);
    };
    getItem();
  }, [id]);

  useEffect(() => {
    const loadUser = async () => {
      const res = await axios.get("http://localhost:3400/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

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
      orderedItems: [
        {
          product: theItem._id,
          qty
        }
      ],
      deliveryFee,
      discount,
      shipAdd: formData.cusAdd,
      email: formData.email,
      phoneNo: formData.contactNo
    };

    const res = await axios.post(
      "http://localhost:3400/user/order/create",
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    console.log("Order placed:", res.data);
  };

  return (
    <section className="max-w-7xl rounded-2xl min-h-screen mx-auto bg-[#2c3936] mt-8 p-6 grid grid-cols-1 md:grid-cols-2 gap-8  ">
            <div className="shadow-lg rounded-2xl border border-[#ffe2af] p-4 mb-8">
                <h2 className="md:text-2xl text-xl text-left text-[#ffe2af] font-bold border-b-2 border-[#ffe2af] w-1/2 md:w-1/3 pb-2">Order Summary</h2>
                <div>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-4">Product Name: <span >{theItem?.Title}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">Price: <span >{theItem?.Price}</span></h4>
                    <div className="text-lg font-semibold text-left text-[#ffe2af] mt-2 flex place-items-center gap-x-4">Quantity: <button className={`${qty === 1 ? 'cursor-not-allowed bg-red-400' : 'cursor-pointer bg-red-700 hover:bg-red-800'}  rounded-sm px-2 h-8 text-2xl text-center   transition-all duration-300`} onClick={()=> setQty(qty > 1 ? qty -1 : qty)}>-</button> <span >{qty > 9 ? qty : `0${qty}`}</span> <button className={` bg-green-700 rounded-sm px-2 h-8 text-2xl text-center cursor-pointer hover:bg-green-800 transition-all duration-300`} onClick={()=> setQty(qty + 1)}>+</button></div>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">DeliveyFee: <span >{theItem?.deliveryFee}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">Discount: <span >{theItem?.offPrice}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">Total Amount: <span >{totalAmount}</span></h4>
                </div>
            </div>
      <form onSubmit={placeOrder} className=" shadow-2xl rounded-2xl space-y-2 bg-[#2c3639]  border border-[#ffe2af]  mb-8 p-4">
            <div className="text-center mt-4 mb-12">
            <h2 className="text-center text-2xl text-[#ffe2af]">Fill the Form</h2>
             </div>
            
            <div className="grid grid-cols-3 place-items-center gap-2">
                <div className="flex flex-col w-full">
                <LaBel lblFor={'Name'} lblName={'Your Name'} />
                <InPut type={'text'} placeholder={'Your Name'} id={'Name'} value={formData.cusName} onChange={(a)=> setFormData({...formData, cusName: a.target.value})} />
                </div>

                <div className="flex flex-col w-full">
                <LaBel lblFor={'email'} lblName={'Your Email'} />
                <InPut type={'email'} placeholder={'Your Email'} id={'email'} value={formData.email} onChange={(a)=> setFormData({...formData, email: a.target.value})} />
                </div>
                <div className="flex flex-col w-full">
                <LaBel lblFor={'phoneNo'} lblName={'Your Phone Number'} />
                <InPut type={'digit'} placeholder={'Your Phone Number'} id={'phoneNo'} value={formData.contactNo} onChange={(a)=> setFormData({...formData, contactNo: a.target.value})} />
                </div>
            </div>
            <div>
             </div>
        <LaBel lblFor={'address'} lblName={'Your Address'} />
                 <textarea rows={4} cols={2} resize-none className="w-full p-2 outline-none bg-[#ffe2af] rounded-2xl" placeholder="Your Address" id="address" value={formData.cusAdd} onChange={(a)=> setFormData({...formData, cusAdd: a.target.value})}
                    > </textarea>

        <div className="w-full flex justify-center">
            <button type="submit" className="w-1/2 md:w-1/3  cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md mt-4 transition">
                Place Order
            </button>
            </div>
      </form>
    </section>
  );
}

export default Order;
