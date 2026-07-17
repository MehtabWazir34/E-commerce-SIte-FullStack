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
        const res = await axiosInstance.get(`/admin/order/info/${id}`);
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
          const theOrd = await axiosInstance.delete(`/user/deleteorder/${id}`);
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

 
  let qty = order?.orderedItem?.qty || 0  ;


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-500 flex items-center justify-center font-sans">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-500 flex items-center justify-center font-sans">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent rounded-3xl mt-8 mx-3 md:mx-8 p-6 font-sans antialiased text-gray-800">

      {/* Header Container */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">Order Details</h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">Order ID: <span className="text-gray-600 font-mono font-semibold">{order._id}</span></p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
            Created At: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setDelOrder(true)}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-white text-red-600 border border-red-200 hover:bg-red-50 cursor-pointer"
          >
            Delete Order
          </button>
          <div className="[&_select]:rounded-full [&_select]:px-4 [&_select]:py-2.5 [&_select]:text-xs [&_select]:font-bold [&_select]:uppercase [&_select]:bg-purple-600 [&_select]:text-white [&_select]:border-none [&_select]:shadow-sm [&_select]:shadow-purple-100">
            <OrderStatusDropdown orderId={order._id} currentStatus={order.orderStatus} role={user?.role}/>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal Box */}
      {
        delOrder && (
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-base font-sans font-black text-gray-900 uppercase tracking-tight mb-2">
                Delete Order?
              </h2>
              <p className="text-xs text-gray-400 font-medium mb-6">This action cannot be undone. Do you want to delete?</p>

              <div className="flex justify-end gap-x-3">
                <button
                  onClick={() => setDelOrder(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all bg-gray-100 hover:bg-gray-200 text-gray-600 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteOrder(order._id)}
                  className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      }

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Customer & Shipping Information Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-sans font-black text-sm text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-2">Buyer Details</h3>
          <div className="space-y-2 text-xs font-medium text-gray-500">
            <p><strong className="text-gray-700">Name:</strong> {order.customerName}</p>
            <p><strong className="text-gray-700">Contact:</strong> {order.phoneNo}</p>
            <p className="flex items-center gap-2">
              <strong className="text-gray-700">Status:</strong> 
              <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase border border-purple-100">{order.orderStatus}</span>
            </p>
          </div>

          <div className="mt-4 pt-2 border-t border-gray-50">
            <h4 className="font-sans font-bold text-xs text-gray-900 uppercase tracking-wide">Shipping Address</h4>
            <p className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">
              {order.shipAdd}
            </p>
          </div>
        </div>

        {/* Product Section Display Columns */}
        <div className="md:col-span-2 space-y-6">

          {/* Product Media Panel */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-sans font-black text-sm text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">Ordered Item</h3>

            <div className="flex flex-col sm:flex-row gap-5 items-center border border-gray-50 bg-gray-50/40 p-4 rounded-2xl">

              {order.Imgs?.[0] && (
                <div className="w-28 h-28 shrink-0 bg-white border border-gray-100 rounded-xl overflow-hidden p-2 flex items-center justify-center mix-blend-multiply">
                  <img
                    src={
                      order.Imgs[0].startsWith("http")
                        ? order.Imgs[0]
                        : `${order.Imgs[0]}`
                    }
                    alt="product"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              <div className="flex-1 text-center sm:text-left">
                <p className="font-sans font-bold text-base text-gray-900 uppercase tracking-tight">
                  {order.orderedItem.productName}
                </p>
                <p className="text-xs text-purple-600 font-bold mt-1">
                  Price: ${order.orderedItem.price}
                </p>
              </div>

            </div>
          </div>

          {/* Numerical Summary Matrix Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-sans font-black text-sm text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">Order Summary</h3>

            <div className="grid grid-cols-1 gap-3 text-xs font-medium text-gray-500 w-full">
              <div className="w-full justify-between flex">
                <span>Quantity</span>
                <span className="font-sans font-bold text-gray-900">
                  {order.orderedItem.qty}
                </span>
              </div>
              <div className="w-full justify-between flex">
                <span>Delivery</span>
                <span className="font-sans font-bold text-gray-900">
                  ${order.deliveryFee}
                </span>
              </div>
              <div className="w-full flex justify-between">
                <span>Discount</span>
                <span className="font-sans font-bold text-purple-600">
                  -${order.discount}
                </span>
              </div>
              <div className="w-full justify-between flex">
                <span>Unit Subtotal</span>
                <span className="font-sans font-bold text-gray-900">
                  ${order.orderedItem.price + order.deliveryFee}
                </span>
              </div>

              <hr className="border-gray-100 my-1" />

              <div className="font-sans font-black text-base text-gray-900 w-full flex justify-between items-center pt-1">
                <span>Total</span>
                <span className="text-purple-600 text-lg">${order.totalAmount}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Outer Supplementary Details Block */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm w-full my-8">
        <h3 className="font-sans font-black text-sm text-gray-900 uppercase tracking-wide border-b border-gray-100 pb-3 mb-4">Item Details</h3>
        <div className="grid grid-cols-1 bg-gray-50/50 rounded-2xl border border-gray-100 p-4 gap-2 text-xs font-medium text-gray-500 w-full leading-relaxed">
          <p><strong className="text-gray-700">Title:</strong> {order.orderedItem.productName}</p>
          <p className="mt-1"><strong className="text-gray-700">Description:</strong> {order.orderedItem.productInfo}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;