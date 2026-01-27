const orderSchema = new mongoose.Schema(
{
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theUser",
    required: true,
  },

  orderedItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: Number,
      price: Number, // product price snapshot
    }
  ],

  subTotal: {
    type: Number,
    required: true,
  },

  deliveryFee: {
    type: Number,
    default: 0,
  },

  discount: {
    type: Number,
    default: 0,
  },

  tax: {
    type: Number,
    default: 0,
  },

  totalAmount: {
    type: Number,
    required: true,
  },

  orderStatus: {
    type: String,
    default: "Payment Pending",
  }
},
{ timestamps: true }
);
const OrderModel = mongoose.model("placed-orderItems", orderSchema);
export default OrderModel;