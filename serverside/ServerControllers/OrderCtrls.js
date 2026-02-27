import theProduct from "../DBModels/ProductModel.js";
import theOrder from "../DBModels/OrderModel.js";
import { ADMIN_STATUSES, USER_STATUSES } from "../Utility/orderStatus.js";

export const createOrder = async (req, res) => {
  try {
    const {orderedItem, productName, productInfo, deliveryFee, discount, shipAdd, email, phoneNo } = req.body;

    if (!orderedItem ) {
      return res.status(400).json({ message: "No item in order" });
    }

    let subTotal = 0;

      const product = await theProduct.findById(orderedItem.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const itemTotal = (product.Price * orderedItem.qty);
      subTotal += itemTotal;


    const totalAmount = Number(subTotal) + Number(deliveryFee || 0) - Number(discount || 0);

    const order = await theOrder.create({
      customerId: req.user._id, // from auth middleware
      customerName: req.user.fullName,
      email,
      phoneNo,
      shipAdd,
      orderedItem: {
        product: product._id,
        productName: productName || product.Title,
        productInfo: productInfo || product.Detail,
        qty: orderedItem.qty,
        price: product.Price
      },
      subTotal,
      deliveryFee,
      discount,
      totalAmount
    });

    res.status(201).json({
      success: true,
      Msg:"Order created ✅",
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      Msg:"Order failed ❌",
      message: error.message
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await theOrder
      .find()
      .populate("customerName", "userName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      Msg:"All orders fetched ✅",
      orders});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const myOrders = async (req, res) => {
  try {
    const orders = await theOrder
      .find({ customerName: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      Msg:"User orders fetched ✅",
      orders});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const order = await theOrder.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // USER RULES
    if (req.user.role === "user") {
      if (!USER_STATUSES.includes(orderStatus)) {
        return res.status(403).json({ message: "Not allowed" });
      }

      const orderUserId = order.customerName?._id?.toString() || order.customerName?.toString();
      if (orderUserId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
    }

    // ADMIN RULES
    if (req.user.role === "admin") {
      if (!ADMIN_STATUSES.includes(orderStatus)) {
        return res.status(400).json({ message: "Invalid status" });
      }
    }

    // ✅ Use findByIdAndUpdate to avoid full validation errors
    const updatedOrder = await theOrder.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true } // return updated doc
    );

    res.status(200).json({ message: "Order status updated", order: updatedOrder });

  } catch (err) {
    console.error("UPDATE ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
export const deleteOrder = async(req, res)=>{
  try {
    const delOrdr = await theOrder.findByIdAndDelete(req.params.id);
    if(!delOrdr){
      return res.json({
        Msg:"Not found!"
      })
    };

    res.json({
      success: true,
      Msg:"Order deleted ✅",
      delOrdr
    })
  } catch (error) {
    res.json({
      success: false,
      Msg: error.message
    })
  }
}