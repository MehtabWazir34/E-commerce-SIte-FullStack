import axiosInstance from '../Utility/axiosInstance.js'
import { useParams } from "react-router";
import { useUser } from "../Utility/THEUser";
import { useEffect, useState } from "react";
import { LaBel } from "../Inputs/InPuts";
import { TextArea } from "../Inputs/textArea";

function Review(){
    const {id} = useParams();
    const { theUser} = useUser();
    const [reviewComment, setReviewComment] = useState('')

    const addReview = async (e) => {
        e.preventDefault();
        try {
            if(!reviewComment || reviewComment.trim() === '') return;

            // Strict fallback check to prevent passing undefined tokens to MongoDB
            const currentUserId = theUser?._id || theUser?.id;
            
            if (!id || !currentUserId) {
                alert("Authentication or Product parameter trace missing. Please re-login.");
                return;
            }
            
            // Send clear, flat destructured strings directly matching req.body
            const res = await axiosInstance.post(`/user/addreview/${id}`, {
                itemId: id,
                userId: currentUserId,
                comment: reviewComment.trim()
            })
            
            if (res.status === 200) {
                alert("Review added ✅");
                setReviewComment('');
            }
        } catch (error) {
            console.log("Err to add review!", error);
            alert(error.response?.data?.Msg || "Server side processing exception.");
        }
    }

    if(!theUser || !id) return null;
    console.log('IdData', id);
    
    return(
        <div className="min-h-[75vh] w-full my-6 p-4 flex justify-center items-center font-sans antialiased text-gray-800">
            <div className="max-w-xl w-full bg-white border border-gray-100 shadow-sm rounded-3xl p-6 md:p-8">
            <div className="flex gap-x-4">
            <form onSubmit={addReview} className="w-full space-y-5">
            <div className="text-center mb-2">
                <h1 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">How was your experience?</h1>
                <p className="text-xs text-gray-400 mt-2 font-medium leading-relaxed">We would love to hear your feedback! Please share your thoughts about our service and the product.</p>
            </div>

                    {/* Mapping style custom properties over standard input field containers */}
                    <div className="grid [&_textarea]:w-full [&_textarea]:bg-gray-50 [&_textarea]:text-sm [&_textarea]:p-3.5 [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-transparent [&_textarea]:focus:border-purple-300 [&_textarea]:focus:bg-white [&_textarea]:transition-all [&_textarea]:placeholder-gray-400 [&_textarea]:outline-none [&_textarea]:resize-none">
                    {/* <LaBel lblFor={'review'} lblName={'How it was?'}/> */}
                    <TextArea id={'review'} placeholder={'Write your thought here...'} 
                    value={reviewComment} 
                    onChange={(a)=> setReviewComment(a.target.value)}/>
                    </div>
                <button type="submit" className="w-full px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 hover:bg-purple-700 cursor-pointer">Add Review</button>
                </form>
            </div>
            </div>
        </div>
    )
}
export default Review;