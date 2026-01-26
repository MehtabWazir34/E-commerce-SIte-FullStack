import mongoose from "mongoose";
// const priceSchema = new mongoose.Schema(
//   {
//     originalPrice: { type: mongoose.Schema.Types.Decimal128, required: true },
//     mrp: { type: mongoose.Schema.Types.Decimal128, required: true },
//     offPrice: { type: mongoose.Schema.Types.Decimal128, required: true }
//   },
//   {
//     toJSON: {
//       transform: (_, ret) => {
//         if (ret.originalPrice)
//           ret.originalPrice = ret.originalPrice.toString();

//         if (ret.mrp)
//           ret.mrp = ret.mrp.toString();

//         if (ret.offPrice)
//           ret.offPrice = ret.offPrice.toString();
//         return ret;
//       }
//     }
//   }
// );


let theProductSchema = new mongoose.Schema({
    Title:{
        type: String, required: true, 
    },
    Detail:{
        type: String, required: true, 
    },
    // Name:{
    //     type: String, required: true, 
    // },
    Price:{
        type: mongoose.Schema.Types.Decimal128, required: true
        // default:{originalPrice: 0.0, MRPrice:0.0, offPrice:0.0},
        
    },
    deliveryFee:{
        type: mongoose.Schema.Types.Decimal128, default: 100, 
    },
    offPrice:{
        type: mongoose.Schema.Types.Decimal128, default: 0, 
    },
    Category:{
        type: [String], default: []
    },
    Imgs:{
        type: [String], required: true
    }
},
  {
    toJSON:{
      transform:(_, a)=>{
        if(a.Price) 
         a.Price = a.Price.toString();
        if(a.deliveryFee) 
         a.deliveryFee = a.deliveryFee.toString();
        if(a.offPrice)
          a.offPrice = a.offPrice.toString();

        return a
      }
    }
  },

{timestamps: true});

 const theProduct = mongoose.model('Product', theProductSchema);
 export default theProduct