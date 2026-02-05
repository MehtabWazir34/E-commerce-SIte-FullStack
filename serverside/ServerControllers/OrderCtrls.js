import theProduct from "../DBModels/ProductModel.js";
import theOrder from "../DBModels/OrderModel.js";
import { ADMIN_STATUSES, USER_STATUSES } from "../Utility/orderStatus.js";

export const createOrder = async (req, res) => {
  try {
    const {
      orderedItems,
      deliveryFee,
      discount,
      shipAdd,
      email,
      phoneNo
    } = req.body;

    if (!orderedItems || orderedItems.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Calculate subtotal using DB prices
    let subTotal = 0;
    const itemsWithPrice = [];

    for (const item of orderedItems) {
      const product = await theProduct.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const itemTotal = product.Price * item.qty;
      subTotal += itemTotal;

      itemsWithPrice.push({
        product: product._id,
        qty: item.qty,
        price: product.Price // snapshot
      });
    }

    const totalAmount =
      subTotal + (deliveryFee || 0) - (discount || 0);

    const order = await theOrder.create({
      customerId: req.user._id, // from auth middleware
      customerName: req.user.fullName,
      email,
      phoneNo,
      shipAdd,
      orderedItems: itemsWithPrice,
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
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // USER RULES
    if (req.user.role === "user") {
      if (!USER_STATUSES.includes(orderStatus)) {
        return res.status(403).json({
          message: "You are not allowed to set this status"
        });
      }

      // user can only update their own order
      if (order.customerName.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized order access" });
      }
    }

    // ADMIN RULES
    if (req.user.role === "admin") {
      if (!ADMIN_STATUSES.includes(orderStatus)) {
        return res.status(400).json({ message: "Invalid order status" });
      }
    }

    order.orderStatus = orderStatus;
    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to update order" });
  }
};
