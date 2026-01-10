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

    cartList:{
        type:[
            {
            product:{type:[mongoose.Schema.Types.ObjectId], ref : 'products'},
            itmesQty: { type: Number, default:1}
            },
            ],
        default:[]
            },
    fvrtItems:{
        type: [mongoose.Schema.Types.ObjectId], ref:"products"
    },

    orderedItems:{
        type:[mongoose.Schema.Types.ObjectId], ref:'placed-orderItems'
    },

}, {timestamps: true});

export default mongoose.model('UserModel', theUserSchema);