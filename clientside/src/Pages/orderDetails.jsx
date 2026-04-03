import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from '../Utility/axiosInstance.js'
import OrderStatusDropdown from "../Parts/dropMenu";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [updating, setUpdating] = useState(false);
// console.log(id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/admin/order/info/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        });
        const userRes = await axiosInstance.get(`/user/me`)
        setUser(userRes.data.user);
        console.log('User',userRes.data.user);
        (userRes.data.user);
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

  const [delOrder, setDelOrder] = useState(false)

  const deleteOrder = async()=>{
    try {
          const theOrd = await axiosInstance.delete(`/user/deleteorder/${id}`, {
            headers:{
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          alert("Order deleted ✅")
          setDelOrder(false)  
          // setDelOrder(theOrd.data.delOrdr)
          window.location.reload()
          navigate(-1)
          console.log('Delted order:', theOrd);
          
    } catch (error) {
      console.log("Err:", error);
      
    }
  }

  // const confirmDelteOrder = (id)=>{
  //     deleteOrder(id)
  // }
  // console.log("user", user);
  
  // const updateStatus = async (newStatus) => {
  //   if (!order) return;
  //   setUpdating(true);

  //   try {
  //     const res = await axiosInstance.put(
  //       ``/admin/order/info/${id}`,
  //       { orderStatus: newStatus },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     // IMPORTANT: Replace full order with updated order returned from backend
  //     setOrder(res.data.updatedOrder);
  //   } catch (error) {
  //     console.log("Error updating status:", error);
  //   } finally {
  //     setUpdating(false);
  //   }
  // };
  let qty = order?.orderedItem?.qty || 0  ;

// if (delOrder) {
//   return (
    
//   );
// }
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
            onClick={() => setDelOrder(true)}
            className="px-4 py-2 cursor-pointer bg-red-600 rounded-md"
          >
            Delete Order
          </button>
          <OrderStatusDropdown orderId={order._id} currentStatus={order.orderStatus} role={user?.role}/>
        </div>
      </div>
      {
        delOrder && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#2c3936] w-120 p-6 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          This action cannot be undone. Do you want to delete?
        </h2>

        <div className="flex justify-end gap-x-4">
          <button
            onClick={() => setDelOrder(false)}
            className="p-2 text-lg font-semibold cursor-pointer bg-gray-400 rounded-2xl hover:bg-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>

          <button
            onClick={() => deleteOrder(order._id)}
            className="p-2 text-lg font-semibold cursor-pointer bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
        )
      }
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
                      : `${order.Imgs[0]}`
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
                  Price: {order.orderedItem.price}
                </p>
                
              </div>

            </div>
          </div>
          {/* Order Summary */}
          <div className="bg-black/30 p-5 rounded-xl">
            <h3 className="font-semibold mb-3">Order Summary</h3>

          <div className="grid grid-cols-1 gap-2 text-sm flex-1 w-full">
            <div className="w-full justify-between flex">
              <span>Quantity</span>
              <span className="text-right">
                {order.orderedItem.qty}
              </span>
              </div>
            <div className="w-full justify-between flex">
              <span>Delivery</span>
              <span className="text-right">
                {order.deliveryFee}
              </span>
              </div>
            <div className="w-full flex justify-between">
              <span>
                  Discount 
              </span>
              <span className="text-right font-medium">
                {order.discount}
              </span>
            </div>
            <div className="w-full justify-between flex">
              <span>Unit Subtotal</span>
              <span className="text-right">
                {order.orderedItem.price + order.deliveryFee}
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