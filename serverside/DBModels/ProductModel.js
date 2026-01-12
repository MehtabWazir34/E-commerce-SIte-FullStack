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
    Title:{
        type: String, required: true, 
    },
    Detail:{
        type: String, required: true, 
    },
    Name:{
        type: String, required: true, 
    },
    Price:{
        type: priceSchema, required: true
        // default:{originalPrice: 0.0, MRPrice:0.0, offPrice:0.0},
    },
    Size:{
        type: [String], default: [], 
    },
    Category:{
        type: [String], default: []
    },
    Imgs:{
        type: [String], required: true
    }
}, {timestamps: true});

 const theProduct = mongoose.model('Product', theProductSchema);
 export default theProduct