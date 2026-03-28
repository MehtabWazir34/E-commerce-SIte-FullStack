// pages/MyAccount.jsx
import { useEffect, useState } from "react";
// import api from "../Utility/api.js";
import axios from "axios";
import OrderStatusDropdown from "../Parts/dropMenu.jsx";
import UserRoleDropdown from "../Utility/userRole.jsx";
import { useUser } from "../Utility/THEUser.jsx";
import { NaVLink } from "../Inputs/InPuts.jsx";

export default function Profile() {
  const {theUser} = useUser();
  // const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect( () => {
    const getData = async () => {
    try {
        const orders = await axios.get(`${import.meta.env.VITE_API_URL}/user/orders`,{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }});
        setOrders(orders.data.orders);
    } catch (error) {
        console.log("Erro", error);
    }
    }
    getData()
  }, []);

  const activeOrders = orders.filter((o)=> o.orderStatus === 'Pending').length;
  const cancelledOrders = orders.filter((o)=> o.orderStatus === 'Cancelled').length;
  const completedOrders = orders.filter((o)=> o.orderStatus === 'Delivered').length
  
  return (
    <div className="min-h-screen max-w-7xl mx-auto mt-8 rounded-2xl bg-[#2c3936] text-[#ffe2af] p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Profile Card */}
        <div className="bg-[#1f2a27] rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
          {theUser && (
            <div className="space-y-2">
              <p><b>Name:</b> {theUser.fullName}</p>
              <p><b>Email:</b> {theUser.email}</p>
              <div className="flex gap-x-4 items-center"><b>Role:</b> 
              <UserRoleDropdown
                    userId={theUser._id}
                    currentRole={theUser.role}
                    />
                    </div>

            </div>
          )}
        </div>

        {/* Miniboard for Admin only */}
      <section data-aos="fade-down" data-aos-duration="300" className={`${theUser?.role === 'admin' ? '' : 'hidden'} min-h-1/3 bg-[#1f2a27] rounded-2xl p-6`}>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[#ffe2af] gap-3">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <h2 className="text-sm md:text-lg">
          Welcome <span className="font-bold">{theUser?.fullName}</span>
        </h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 text-white">
        <StatCard title="Total Orders" value={orders.length} color="bg-indigo-600/85" />
        <StatCard title="Active Orders" value={activeOrders} color="bg-yellow-600/85" />
        <StatCard title="Completed Orders" value={completedOrders} color="bg-green-600/85" />
        <StatCard title="Cancelled Orders" value={cancelledOrders} color="bg-red-600/85" />
      </div>
      <div className="flex justify-center mt-8">
        <NaVLink linkedTo={'/adminboard'} Name={'See Details'}/>
      </div>
        </section>
        
        <div className={`${theUser?.role !== 'admin' ? '' : 'hidden'} bg-[#1f2a27] rounded-2xl p-6`}>
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>

          {orders.length === 0 && <p>No orders yet.</p>}

          <div className="grid md:grid-cols-2 gap-4">
            {orders.map(order => (
              <div key={order._id} className="border border-[#ffe2af]/20 rounded-xl p-4">
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Total:</b> Rs {order.totalAmount}</p>
                <div className="mt-1 flex gap-x-2 items-center">
                <p><b>Status:</b></p>
                <OrderStatusDropdown
                  orderId={order._id}
                  currentStatus={order.orderStatus}
                  role={theUser?.role}
                  />
                  </div>
              </div>
              
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
function StatCard({title, value, color}){
  let timeHrs = new Date().getHours();
  let timeMns = new Date().getMinutes();
  let timeMode = timeHrs >= 12? 'PM' : 'AM';
  return(
     <div data-aos="fade-right" data-aos-duration="500" className={`${color} rounded-xl p-4`}>
      <h2 className="font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <span className="text-xs">
        Updated today at {title === "Total Orders"? new Date().toLocaleString() : timeHrs > 9 ? `${timeHrs}:${timeMns} ${timeMode}` : `0${timeHrs}:${timeMns} ${timeMode}`}
      </span>
    </div>
  )
}
