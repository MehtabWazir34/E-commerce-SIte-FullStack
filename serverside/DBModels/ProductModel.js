import mongoose from "mongoose";

let theProductSchema = new mongoose.Schema({
    Title:{
        type: String, required: true, 
    },
    Detail:{
        type: String, required: true, 
    },
    Price:{
        type: mongoose.Schema.Types.Decimal128, required: true        
    },
    deliveryFee:{
        type: mongoose.Schema.Types.Decimal128, default: 100, 
    },
    offPrice:{
        type: mongoose.Schema.Types.Decimal128, default: 0, 
    },
    Category:{
        type: String, default: []
    },
    Imgs:[{
        type: String, required: true
    }]
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