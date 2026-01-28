import mongoose from 'mongoose'
const addToCart = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theUser'
    },
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    itemQty:{
        type: Number, default:0
    }
},
{timestamps:true}
)

let theCart = mongoose.model("theCart", addToCart);
export default theCart;