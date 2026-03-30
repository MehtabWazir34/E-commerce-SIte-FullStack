import axios from "axios";
import { useParams } from "react-router";
import { useUser } from "../Utility/THEUser";
import { useEffect, useState } from "react";
import { LaBel } from "../Inputs/InPuts";
import { TextArea } from "../Inputs/textArea";

function Review(){
    const {id} = useParams();
    const { theUser} = useUser();

    const [formData, setFormData] = useState({
        itemId:'', userId:'', comment:''
    });
    useEffect(() => {
        if (theUser && id) {
            setFormData({
                itemId: id,
                userId: theUser.id || theUser._id,
                comment: ''
            });
        }
    }, [theUser, id]);

    const addReview = async (e) => {
        // if(theUser && id) {
        //     setFormData({itemId: id, userId: theUser.id || theUser._id, comment:''})
        // }
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/user/addreview/${id}`,{
                itemId: formData.itemId,
                userId: formData.userId,
                comment: formData.comment
            },{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
        } catch (error) {
            console.log("Err to add review!", error);
            
        }
        }

    if(!theUser || !id) return null;
    console.log('FormData', formData);
    
    return(
        <div className="min-h-[80vh] w-full my-6 bg-black p-6  flex justify-center ">
            <div className="max-w-7xl bg-[#2c3936] rounded-md p-10">
            <div className="flex gap-x-4 mt-6">
            <form onSubmit={addReview} className="w-full space-y-3 border border-amber-200 rounded-md p-4">
            <h1 className="text-3xl font-bold text-[#ffe2af] text-center">How was your experience?</h1>
            <p className="text-[#ffe2af] mt-4">We would love to hear your feedback! Please share your thoughts about our service and products.</p>

                    <div className="grid">
                    {/* <LaBel lblFor={'review'} lblName={'How it was?'}/> */}
                    <TextArea id={'review'} placeholder={'Write you thought here...'} 
                    value={formData.comment} 
                    onChange={(a)=> setFormData({...formData, comment: a.target.value})}/>
                    </div>
                <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Add Review</button>
                </form>
            </div>
            </div>
        </div>
    )
}
export default Review