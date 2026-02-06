import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theUser",
    // type: String,    
    required: true,
  },
  customerName: { type: String, required: true },  
  email: { type: String, required: true },
  phoneNo: { type: Number, required: true },
  shipAdd: { type: String, required: true },

  orderedItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theProduct",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],

  subTotal: { type: Number, required: true },
  deliveryFee: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },

  orderStatus: {
    type: String,
    enum: ["Payment Pending", "Paid", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Payment Pending"
  }
}, { timestamps: true });

export default mongoose.model("theOrder", orderSchema);
