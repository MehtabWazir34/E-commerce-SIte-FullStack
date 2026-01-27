import mongoose from "mongoose";

let theOrderSchema = new mongoose.Schema(
    {
    customerName:{
        type: mongoose.Schema.Types.ObjectId, ref: 'theUser',
    },
    orderedItems:[{
        type:[{
            Product: {type:[mongoose.Schema.Types.ObjectId], ref:'Product', required: true},
            Qty: { type: Number, default: 1},
        }],
        default:[]
    }],
    totalAmount:{
        type:[mongoose.Schema.Types.Decimal128], default: 0.0
    },
    orderStatus:{
        type: String, default:"Payment Pending!"
    },
}, 
    {
        toJSON:{
            transform:(_, a)=>{
                if(a.totalAmount)
                    a.totalAmount = a.totalAmount.toString();
                return a;
            }
        }
    },

    {timestamps: true},
);
export default mongoose.model('Order', theOrderSchema);