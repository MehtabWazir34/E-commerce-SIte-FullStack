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
            await axios.post(`${import.meta.env.VITE_API_URL}/user/addreview/${id}`,formData,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
            })
        } catch (error) {
            console.log("Err to add review!", error);
            
        }
        }

    if(!theUser || !id) return null;
    // console.log('FormData', formData);
    
    return(
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-[#2c3936] rounded-2xl p-10">
            <h1 className="text-3xl font-bold text-[#2c3936]">How was your experience?</h1>
            <p className="text-[#ffe2af] mt-4">We would love to hear your feedback! Please share your thoughts about our service and products.</p>
            <div className="flex gap-x-4 mt-6">

                <form onSubmit={addReview} className="border border-amber-200 rounded-md p-4">
                    <div className="grid">
                    <LaBel lblFor={'review'} lblName={'How it was?'}/>
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