import mongoose from "mongoose";

let theUserSchema = new mongoose.Schema({
    fullName:{
        type: String, required: true
    },
    
    userName:{
        type: String, required: true, unique: true
    },
    email:{
        type: String, required: true, unique: true
    },
    password:{
        type: String, required: true
    },
    profileImg:{
        type: String, default:''
    },
    phoneNo:{
        type: Number, required: true, unique: true
    },
    // refreshToken:{
    //     type:String, default: null
    // },

    cartList:{
        type:[
            {
            product:{type:[mongoose.Schema.Types.ObjectId], ref : 'Product'},
            itmesQty: { type: Number, default:1}
            },
            ],
        default:[]
            },
    fvrtItems:{
        type: [mongoose.Schema.Types.ObjectId], ref:"Product"
    },

    orderedItems:{
        type:[mongoose.Schema.Types.ObjectId], ref:'placed-orderItems'
    },

}, {timestamps: true});

 let theUser = mongoose.model('theUser', theUserSchema);
export default theUser