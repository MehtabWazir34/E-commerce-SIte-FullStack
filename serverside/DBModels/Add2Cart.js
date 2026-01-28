import mongoose from 'mongoose'
const addToCart = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theUser', required: true  
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product', required: true        },
    itemQty:{
        type: Number, default:0, required: true 
    }
},
{timestamps:true}
)

let theCart = mongoose.model("theCart", addToCart);
export default theCart;