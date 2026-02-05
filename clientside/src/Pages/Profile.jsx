// pages/MyAccount.jsx
import { useEffect, useState } from "react";
import api from "../Utility/api.js";
import axios from "axios";
import OrderStatusDropdown from "../Parts/dropMenu.jsx";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect( () => {
    // api.get("/user/me").then(res => setUser(res.data));
    // api.get("/user/orders").then(res => setOrders(res.data));
    const getData = async () => {
    try {
        const user = await axios.get("http://localhost:3400/user/me",{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }});
        const orders = await axios.get("http://localhost:3400/user/orders",{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }});
        setOrders(orders.data.orders);
        setUser(user.data.user);
    } catch (error) {
        console.log("Erro", error);
        
    }
    }
    getData()
  }, []);

  console.log("Usr", user);
  console.log("orders", orders);
  
  return (
    <div className="min-h-screen bg-[#2c3936] text-[#ffe2af] p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-[#1f2a27] rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
          {user && (
            <div className="space-y-2">
              <p><b>Name:</b> {user.fullName}</p>
              <p><b>Email:</b> {user.email}</p>
              <select><b>Role:</b> {user.role}</select>
            </div>
          )}
        </div>
          <OrderStatusDropdown/>
        {/* Orders */}
        <div className="bg-[#1f2a27] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>

          {orders.length === 0 && <p>No orders yet.</p>}

          <div className="grid md:grid-cols-2 gap-4">
            {orders.map(order => (
              <div key={order._id} className="border border-[#ffe2af]/20 rounded-xl p-4">
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Total:</b> Rs {order.totalAmount}</p>
                <p><b>Status:</b> {order.orderStatus}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
