import { useEffect, useState } from "react";
import axiosInstance from '../Utility/axiosInstance.js'
import { useNavigate } from "react-router";
import { useUser } from "../Utility/THEUser";

function AdminBoard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  let navigateTo = useNavigate()

  const {theUser} = useUser()
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await axiosInstance.get(
          `/admin/orders`
        );

        setOrders(res?.data?.allOrders || []);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    getAllOrders();
  }, []);

  const activeOrders = orders.filter(
    (o) => o.orderStatus === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.orderStatus === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (o) => o.orderStatus === "Cancelled"
  ).length;

  return (
    <section className="min-h-screen bg-transparent rounded-3xl mt-8 mx-3 md:mx-8 p-4 font-sans antialiased text-gray-800">

      {/* Header Panel wrapper block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-gray-900 gap-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Admin Dashboard</h2>
        <h2 className="text-xs font-medium text-gray-400">
          Welcome <span className="font-bold text-gray-700">{theUser?.fullName}</span>
        </h2>
      </div>

      {/* Stats Section with clean multi-colored metric values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard title="Total Orders" value={orders.length} color="bg-white border border-gray-100 text-gray-700" />
        <StatCard title="Active Orders" value={activeOrders} color="bg-purple-50/50 border border-purple-100 text-purple-700" />
        <StatCard title="Completed Orders" value={completedOrders} color="bg-emerald-50/50 border border-emerald-100 text-emerald-700" />
        <StatCard title="Cancelled Orders" value={cancelledOrders} color="bg-rose-50/50 border border-rose-100 text-rose-700" />
      </div>

      {/* Clean Minimalist Orders Data Table layout container */}
      <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Contact</th>
                <th className="p-4 font-bold">Quantity</th>
                <th className="p-4 font-bold">Total Price</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-600 font-medium">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="p-4 text-gray-900 font-semibold max-w-[150px] truncate">{order.customerId}</td>
                    <td className="p-4 font-mono text-gray-500">{order.phoneNo}</td>
                    <td className="p-4 text-gray-900">
                      {order?.orderedItem?.qty > 9 ? `${order?.orderedItem?.qty}` : `0${order?.orderedItem?.qty}`}
                    </td>
                    <td className="p-4 font-semibold text-gray-900">${order.totalAmount}</td>
                    <td className="p-4">
                      <span className={`inline-block font-bold px-2 py-0.5 text-[10px] uppercase rounded-full border ${order.orderStatus === 'Cancel' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
                        {order.orderStatus === 'Cancel' ? 'Cancelled' : order.orderStatus}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={()=> navigateTo(`/orderdetails/${order._id}`)}
                        className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all bg-gray-100 hover:bg-purple-600 text-gray-600 hover:text-white border border-transparent shadow-sm cursor-pointer"
                      >
                        See Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Module Dialog Overlay box layout frame */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md relative border border-gray-100 shadow-xl animate-fade-in">

            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 text-gray-400 hover:text-gray-900 flex items-center justify-center font-bold text-sm cursor-pointer transition-colors"
              onClick={() => setSelectedOrder(null)}
            >
              ✕
            </button>

            <h2 className="text-lg font-sans font-black text-gray-900 uppercase tracking-tight mb-4">Order Summary</h2>

            {selectedOrder.Imgs?.[0] && (
              <div className="w-full h-40 bg-gray-50 rounded-2xl overflow-hidden p-4 flex items-center justify-center mb-4 border border-gray-100">
                <img
                  src={
                    selectedOrder.Imgs[0].startsWith("http")
                      ? selectedOrder.Imgs[0]
                      : `${selectedOrder.Imgs[0]}`
                  }
                  alt="product"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            <div className="space-y-2 text-xs font-medium text-gray-500 border-t border-gray-50 pt-3">
              <p><strong className="text-gray-700">Product:</strong> {selectedOrder.productName}</p>
              <p><strong className="text-gray-700">Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong className="text-gray-700">Quantity:</strong> {selectedOrder.qty}</p>
              <p><strong className="text-gray-700">Status:</strong> {selectedOrder.orderStatus}</p>
              <p><strong className="text-gray-700">Contact:</strong> {selectedOrder.phoneNo}</p>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

function StatCard({ title, value, color }) {
  let dHrs = new Date().getHours();
  let dMns = new Date().getMinutes();
  let AmPm = dHrs >= 12 ? "PM" : "AM";
  return (
    <div data-aos="fade-right" data-aos-duration="400" className={`${color} rounded-2xl p-4 shadow-sm flex flex-col justify-between min-h-28`}>
      <h2 className="text-xs font-bold uppercase tracking-wider opacity-80">{title}</h2>
      <p className="text-2xl font-black tracking-tight mt-1">{value}</p>
      <span className="text-[10px] opacity-60 font-medium block mt-3">
        Updated today at {title === "Total Orders"? new Date().toLocaleString() : dHrs > 9 ? `${dHrs}:${dMns} ${AmPm}` : `0${dHrs}:${dMns} ${AmPm}`}
      </span>
    </div>
  );
}

export default AdminBoard;