import mongoose from "mongoose";

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
        type: [{
            originalPrice: {type: [mongoose.Schema.Types.Decimal128], default:0.0},
            MRPrice: {type: [mongoose.Schema.Types.Decimal128], default:0.0},
            offPrice: {type: [mongoose.Schema.Types.Decimal128], default:0.0}
        }],
        default:{originalPrice: 0.0, MRPrice:0.0, offPrice:0.0},
    },
    productSize:{
        type: String, default: [], 
    },
    productCategory:{
        type: String, default: []
    }
}, {timestamps: true});

export default mongoose.model('Product', theProductSchema);