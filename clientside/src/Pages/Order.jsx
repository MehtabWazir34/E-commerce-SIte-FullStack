import { useState } from "react"
import {InPut, LaBel} from '../Inputs/InPuts';
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
function Order(){

    const [formData, setFormData] = useState({
        cusName:"", cusAdd:"", contactNo:"", email:""
    });
    let {id} = useParams();
    let [theItem, setTheItem] = useState(null);
    useEffect(()=>{
        const getItem = async()=>{
            try {
                let theItem = await axios.get(`http://localhost:3400/products/${id}`);
                setTheItem(theItem.data.product);
                // console.log("order item details:", theItem.data.product);
            } catch (error) {
                console.log("error to get order details:", error);
                
            }
        }
        getItem()
    },[id])

    if(!theItem) return null;
    return(
        <section className="max-w-7xl rounded-2xl min-h-screen mx-auto bg-[#2c3936] mt-8 p-6 grid grid-cols-1 md:grid-cols-2 gap-8  ">
            <div className="shadow-lg rounded-2xl border border-[#ffe2af] p-4 mb-8">
                <h2 className="md:text-2xl text-xl text-left text-[#ffe2af] font-bold border-b-2 border-[#ffe2af] w-1/2 md:w-1/3 pb-2">Order Summary</h2>
                <div>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-4">Product Name: <span >{theItem?.Title}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">Price: <span >{theItem?.Price}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">Quantity: <span >{theItem?.quantity}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">DeliveyFee: <span >{theItem?.deliveryFee}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">Discount: <span >{theItem?.offPrice}</span></h4>
                    <h4 className="text-lg font-semibold text-left text-[#ffe2af] mt-2">Total Amount: <span >{theItem?.Price * theItem?.quantity + theItem?.deliveryFee - theItem?.offPrice}</span></h4>
                </div>
            </div>

            <form className=" shadow-2xl rounded-2xl space-y-2  border border-[#ffe2af]  mb-8 p-4">
            <div className="text-center mt-4 mb-12">
            <h2 className="text-center text-2xl text-[#ffe2af]">Fill the Form</h2>
            </div>
            
            <div className="grid grid-cols-3 place-items-center gap-2">
                <div className="flex flex-col w-full">
                <LaBel lblFor={'Name'} lblName={'Your Name'} />
                <InPut type={'text'} placeholder={'Your Name'} id={'Name'} value={formData.cusName} onChange={(a)=> setFormData({...formData, cusName: a.target.value})} />
                </div>

                <div className="flex flex-col w-full">
                <LaBel lblFor={'phoneNo'} lblName={'Your Phone Number'} />
                <InPut type={'digit'} placeholder={'Your Phone Number'} id={'phoneNo'} value={formData.contactNo} onChange={(a)=> setFormData({...formData, contactNo: a.target.value})} />
                </div>
                <div className="flex flex-col w-full">
                <LaBel lblFor={'email'} lblName={'Your Email'} />
                <InPut type={'email'} placeholder={'Your Email'} id={'email'} value={formData.email} onChange={(a)=> setFormData({...formData, email: a.target.value})} />
                </div>
            </div>
            <div>
                <LaBel lblFor={'address'} lblName={'Your Address'} />
                <textarea rows={4} cols={2} resize-none className="w-full p-2 outline-none bg-[#ffe2af] rounded-2xl" placeholder="Your Address" id="address" value={formData.cusAdd} onChange={(a)=> setFormData({...formData, cusAdd: a.target.value})}
                    > </textarea>
            </div>

            <div className="w-full flex justify-center">
            <button type="submit" className="w-1/2 md:w-1/3  cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md mt-4 transition">
                Place Order
            </button>

            </div>

            </form>
        </section>
    )
}
export default Order