const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    phone: String,
    address: String
  },

  orderedItems: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      qty: Number,
      price: Number
    }
  ],

  orderStatus: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },

  totalAmount: Number
}, { timestamps: true });
const theMvpOrder = mongoose.model("MVPOrder", orderSchema);
export default theMvpOrder;