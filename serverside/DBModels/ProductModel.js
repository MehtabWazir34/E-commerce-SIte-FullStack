import mongoose from "mongoose";
const priceSchema = new mongoose.Schema({
    originalPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    MRPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    offPrice: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0
    }
}, { _id: false });

let theProductSchema = new mongoose.Schema({
    productTitle:{
        type: String, required: true, 
    },
    productDetail:{
        type: String, required: true, 
    },
    productName:{
        type: String, required: true, 
    },
    productPrice:{
        type: priceSchema, required: true
        // default:{originalPrice: 0.0, MRPrice:0.0, offPrice:0.0},
    },
    productSize:{
        type: [String], default: [], 
    },
    productCategory:{
        type: [String], default: []
    },
    productImgs:{
        type: [String], required: true
    }
}, {timestamps: true});

 const theProduct = mongoose.model('Product', theProductSchema);
 export default theProduct