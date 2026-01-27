import { useState } from "react"
import {InPut, LaBel} from '../Inputs/InPuts';
import {textArea} from '../Inputs/textArea'
function Order(){

    const [formData, setFormData] = useState({
        cusName:"", cusAdd:"", contactNo:""
    });

    return(
        <section className="max-w-7xl rounded-2xl min-h-screen mx-auto bg-[#2c3936] mt-8 p-6  ">

            <div className="text-center mt-4 mb-12">
            <h2 className="text-center text-2xl text-[#ffe2af]">Fill the Form</h2>
            <h4 className="text-center text-xl text-[#ffe2af]">to place your order</h4>
            </div>
            <form className="flex flex-col w-full md:max-w-2/3 rounded-2xl space-y-2 mx-auto border border-[#ffe2af] gap-4 md:mt-0 px-4 py-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                <div className="flex flex-col w-full">
                <LaBel lblFor={'Name'} lblName={'Your Name'} />
                <InPut type={'text'} placeholder={'Your Name'} id={'Name'} value={formData.cusName} onChange={(a)=> setFormData({...formData, cusName: a.target.value})} />
                </div>

                <div className="flex flex-col w-full">
                <LaBel lblFor={'phoneNo'} lblName={'Your Phone Number'} />
                <InPut type={'digit'} placeholder={'Your Phone Number'} id={'phoneNo'} value={formData.contactNo} onChange={(a)=> setFormData({...formData, contactNo: a.target.value})} />
                </div>
            </div>
            <div>
                <LaBel lblFor={'address'} lblName={'Your Address'} />
                <textarea rows={4} cols={2} resize-none className="w-full p-2 outline-none bg-[#ffe2af] rounded-2xl" placeholder="Your Address" id="address" value={formData.cusAdd} onChange={(a)=> setFormData({...formData, cusAdd: a.target.value})}
                    > </textarea>
            </div>

            <button type="submit" className="w-1/2 md:w-1/3 mx-auto cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md mt-4 transition">
                Place Order
            </button>

            </form>
        </section>
    )
}
export default Order