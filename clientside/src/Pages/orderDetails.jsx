import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
console.log(id);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:3400/admin/order/info/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });

        // if(res.data.success){
        //     setOrder(res.data.tOrder);
        // }
        setOrder(res.data.tOrder);
        console.log("OrderRes:",res);
        
      } catch (error) {
        console.log("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  console.log(order);
  
  const updateStatus = async (newStatus) => {
    if (!order) return;
    setUpdating(true);

    try {
      const res = await axios.put(
        `http://localhost:3400/admin/order/info/${id}`,
        { orderStatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // IMPORTANT: Replace full order with updated order returned from backend
      setOrder(res.data.updatedOrder);
    } catch (error) {
      console.log("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  let qty = order?.orderedItem?.qty || 0  ;
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#2c3936] text-white flex items-center justify-center">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#2c3936] text-white flex items-center justify-center">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2c3936] rounded-2xl mt-8 mx-3 md:mx-8 p-6 text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-sm text-gray-300">Order ID: {order._id}</p>
          <p className="text-sm text-gray-400">
            Created At: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 rounded-md"
          >
            Back
          </button>

          <button
            disabled={updating}
            onClick={() =>
              updateStatus(
                order.orderStatus === "Delivered"
                  ? "Payment Pending"
                  : "Delivered"
              )
            }
            className="px-4 py-2 bg-green-600 rounded-md"
          >
            {order.orderStatus === "Delivered"
              ? "Mark Pending"
              : "Mark Delivered"}
          </button>

          <button
            disabled={updating}
            onClick={() => updateStatus("Cancelled")}
            className="px-4 py-2 bg-red-600 rounded-md"
          >
            Cancel Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Customer & Shipping */}
        <div className="bg-black/30 p-5 rounded-xl">
          <h3 className="font-semibold mb-3">Buyer Details</h3>
          <p><strong>Name:</strong> {order.customerName}</p>
          <p><strong>Contact:</strong> {order.phoneNo}</p>
          <p><strong>Status:</strong> {order.orderStatus}</p>

          <div className="mt-4">
            <h4 className="font-medium">Shipping Address</h4>
            <p className="text-sm text-gray-300 mt-1">
              {order.shipAdd}
            </p>
          </div>
        </div>

        {/* Product Section */}
        <div className="md:col-span-2 space-y-4">

          <div className="bg-black/30 p-5 rounded-xl">
            <h3 className="font-semibold mb-3">Ordered Item</h3>

            <div className="flex flex-col md:flex-row gap-4 items-center border p-4 rounded-lg">

              {order.Imgs?.[0] && (
                <img
                  src={
                    order.Imgs[0].startsWith("http")
                      ? order.Imgs[0]
                      : `http://localhost:3400${order.Imgs[0]}`
                  }
                  alt="product"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}

              <div className="flex-1">
                <p className="font-medium text-lg">
                  {order.orderedItem.productName}
                </p>
                <p className="text-sm text-gray-300">
                  Quantity: {qty > 9 ? qty : `0${qty}`}
                </p>
                <p className="text-sm text-gray-300">
                  Unit Price: {order.orderedItem.price}
                </p>
                <p className="text-sm text-gray-300">
                  Delivery Fee: {order.deliveryFee}
                </p>
              </div>

            </div>
          </div>
          {/* Order Summary */}
          <div className="bg-black/30 p-5 rounded-xl">
            <h3 className="font-semibold mb-3">Order Summary</h3>

            <div className="grid grid-cols-1 gap-2 text-sm flex-1 w-full">
                  <div className="w-full justify-between flex">
              <span>Subtotal</span>
              <span className="text-right">
                {order.orderedItem.price + order.deliveryFee}
              </span>

                  </div>
              <div className="w-full flex justify-between">
              <span>
                  Discount Price 
                
              </span>
               
              <span className="text-right font-medium">
                {order.discount}
              </span>
              </div>

              <div className="font-bold border-t pt-2 w-full flex-1 flex justify-between">
              <span >Total</span>
              <span>{order.totalAmount}</span>
              </div>
            </div>
          </div>


        </div>
      </div>
          {/* Item Details */}
          <div className="bg-black/30 p-5 rounded-xl w-full my-4">
            <h3 className="font-bold mb-3">Item Details</h3>

            <div className="grid grid-cols-1 rounded-2xl border p-4 gap-2 text-sm flex-1 w-full">
              <p><strong>Title:</strong> {order.orderedItem.productName}</p>
              <p><strong>Description:</strong> {order.orderedItem.productInfo}</p>
            </div>
          </div>
    </div>
  );
}

export default OrderDetails;