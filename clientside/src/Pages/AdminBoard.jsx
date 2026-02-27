import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function AdminBoard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  let navigateTo = useNavigate()

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3400/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
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
    <section className="min-h-screen bg-[#2c3936] rounded-2xl mt-8 mx-3 md:mx-8 p-4">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[#ffe2af] gap-3">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <h2 className="text-sm md:text-lg">
          Welcome <span className="font-bold">Wazir</span>
        </h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-white">
        <StatCard title="Total Orders" value={orders.length} color="bg-indigo-600/85" />
        <StatCard title="Active Orders" value={activeOrders} color="bg-yellow-600/85" />
        <StatCard title="Completed Orders" value={completedOrders} color="bg-green-600/85" />
        <StatCard title="Cancelled Orders" value={cancelledOrders} color="bg-red-600/85" />
      </div>

      {/* Orders Table */}
      <div className="mt-10 bg-white rounded-xl overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Customer</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total Price </th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{order.customerId}</td>
                  <td className="p-3">{order.phoneNo}</td>
                  <td className="p-3">{order?.orderedItem?.qty > 9 ? `${order?.orderedItem?.qty}` : 
                  `0${order?.orderedItem?.qty}`}</td>
                  <td className="p-3">{order.totalAmount}</td>
                  <td className="p-3">{order.orderStatus}</td>
                  {/* <td className="p-3">{order._id}</td> */}
                  <td className="p-3">
                    <button
                      // onClick={() => setSelectedOrder(order)}
                      onClick={()=> navigateTo(`/orderdetails/${order._id}`)}
                      className="bg-[#2c3936] text-white px-3 py-1 rounded-md"
                    >
                      See Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">

            <button
              // onClick={() => setSelectedOrder(null)}
              // onClick={()=> navigateTo(`/orderdetails/${}`)}
              className="absolute top-3 right-3 text-gray-600"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {selectedOrder.Imgs?.[0] && (
              <img
                src={
                  selectedOrder.Imgs[0].startsWith("http")
                    ? selectedOrder.Imgs[0]
                    : `http://localhost:3400${selectedOrder.Imgs[0]}`
                }
                alt="product"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <p><strong>Product:</strong> {selectedOrder.productName}</p>
            <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
            <p><strong>Quantity:</strong> {selectedOrder.qty}</p>
            <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            <p><strong>Contact:</strong> {selectedOrder.phoneNo}</p>

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
    <div className={`${color} rounded-xl p-4`}>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <span className="text-xs">
        Updated today at {title === "Total Orders"? new Date().toLocaleString() : dHrs > 9 ? `${dHrs}:${dMns} ${AmPm}` : `0${dHrs}:${dMns} ${AmPm}`}
      </span>
    </div>
  );
}

export default AdminBoard;