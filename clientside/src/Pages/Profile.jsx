import { useEffect, useState } from "react";
import OrderStatusDropdown from "../Parts/dropMenu.jsx";
import UserRoleDropdown from "../Utility/userRole.jsx";
import { useUser } from "../Utility/THEUser.jsx";
import { NaVLink } from "../Inputs/InPuts.jsx";
import axiosInstance from '../Utility/axiosInstance.js'
export default function Profile() {
  const {theUser} = useUser();
  const [orders, setOrders] = useState([]);

  useEffect( () => {
    const getData = async () => {
    try {
        const orders = await axiosInstance.get(`/user/myorders`);
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
    <div className="min-h-screen max-w-7xl mx-auto mt-8 rounded-3xl bg-transparent text-gray-800 p-4 md:p-6 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Profile Card Container with soft drop shadow */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-sans font-black text-gray-900 uppercase tracking-tight mb-4">My Profile</h2>
          {theUser && (
            <div className="space-y-3 text-sm font-medium text-gray-500">
              <p><b className="text-gray-700 font-bold">Name:</b> {theUser.fullName}</p>
              <p><b className="text-gray-700 font-bold">Email:</b> {theUser.email}</p>
              <div className="flex gap-x-3 items-center pt-1"><b className="text-gray-700 font-bold">Role: {theUser.role !=='admin' ? 'User' : 'Admin'}</b> 
              <div className="[&_select]:rounded-full [&_select]:px-3 [&_select]:py-1 [&_select]:text-[11px] [&_select]:font-bold [&_select]:uppercase [&_select]:bg-gray-100 [&_select]:text-gray-600 [&_select]:border-none">
                <UserRoleDropdown
                userId={theUser._id}
                currentRole={theUser.role}
                />
              </div>
              {/* {
                theUser.role === 'admin' &&(
                  
                <UserRoleDropdown
                userId={theUser._id}
                currentRole={theUser.role}
                />
                )
                } */}
                    </div>
                    <div className="w-full mt-4 pt-3 border-t border-gray-50">

                <p className="text-xs text-amber-600 font-medium bg-amber-50 p-3 rounded-xl border border-amber-100/50">
                  <strong>NOTE!</strong> This is just for demonstration purposes. Later, it will be accessable to admins only.
                </p>
                    </div>

            </div>
          )}
        </div>

        {/* Miniboard dashboard styled exactly like reference panels */}
      <section data-aos="fade-down" data-aos-duration="300" className={`${theUser?.role === 'admin' ? '' : 'hidden'} bg-white border border-gray-100 shadow-sm rounded-3xl p-6`}>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-gray-900 gap-2 border-b border-gray-100 pb-4">
        <h2 className="text-lg font-sans font-black uppercase tracking-tight">Admin Dashboard</h2>
        <h2 className="text-xs font-medium text-gray-400">
          Welcome <span className="font-bold text-gray-700">{theUser?.fullName}</span>
        </h2>
      </div>

      {/* Stats Section with subtle backgrounds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard title="Total Orders" value={orders.length} color="bg-gray-50 text-gray-700 border border-gray-100 shadow-none" />
        <StatCard title="Active Orders" value={activeOrders} color="bg-purple-50/50 text-purple-700 border border-purple-100 shadow-none" />
        <StatCard title="Completed Orders" value={completedOrders} color="bg-emerald-50/50 text-emerald-700 border border-emerald-100 shadow-none" />
        <StatCard title="Cancelled Orders" value={cancelledOrders} color="bg-rose-50/50 text-rose-700 border border-rose-100 shadow-none" />
      </div>
      <div className="flex justify-center mt-6 [&_a]:rounded-full [&_a]:px-6 [&_a]:py-2.5 [&_a]:text-xs [&_a]:font-bold [&_a]:uppercase [&_a]:tracking-wider [&_a]:bg-purple-600 [&_a]:text-white [&_a]:shadow-sm [&_a]:shadow-purple-100">
        <NaVLink linkedTo={'/adminboard'} Name={'See Details'}/>
      </div>
        </section>

        {/* User Specific Panel Grid */}
        <div className={`${theUser?.role !== 'admin' ? '' : 'hidden'} bg-white border border-gray-100 shadow-sm rounded-3xl p-6`}>
          <h2 className="text-lg font-sans font-black text-gray-900 uppercase tracking-tight mb-4">My Orders</h2>

          {orders.length === 0 && <p className="text-xs text-gray-400 font-medium">No orders yet.</p>}

          <div className="grid md:grid-cols-2 gap-4">
            {orders.map(order => (
              <div key={order._id} className="border border-gray-100 bg-gray-50/30 rounded-2xl p-4 flex flex-col justify-between gap-4">
                <div className="text-xs font-medium text-gray-500 space-y-1">
                  <p><b className="text-gray-700 font-bold">Order ID:</b> <span className="font-mono">{order._id}</span></p>
                  <p><b className="text-gray-700 font-bold">Total:</b> Rs {order.totalAmount}</p>
                </div>
                <div className="mt-1 flex flex-wrap gap-2 items-center text-xs font-medium text-gray-500">
                <p>
                  <b className="text-gray-700 font-bold">Status: </b>
                  <span className={`inline-block font-bold px-2 py-0.5 text-[10px] uppercase rounded-full border ${order.orderStatus === 'Cancel' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-purple-50 text-purple-700 border-purple-100'}`}>
                    {order.orderStatus === 'Cancel' ? 'Cancelled' : order.orderStatus}
                  </span>
                </p>

                {/* <button className="p-2 cursor-pointer border border-amber-200">Cancel Order</button> */}
                {
                  order.orderStatus !== 'Cancel' && (
                    <div className="[&_select]:rounded-full [&_select]:px-3 [&_select]:py-1 [&_select]:text-[10px] [&_select]:font-bold [&_select]:uppercase [&_select]:bg-white [&_select]:border-gray-200">
                      <OrderStatusDropdown
                      orderId={order._id}
                      currentStatus={order.orderStatus}
                      role={theUser?.role}
                      />
                    </div>
                  )
                  }
                  {
                    order.orderStatus === 'Delivered' && (
                      <div className="[&_a]:rounded-full [&_a]:px-3 [&_a]:py-1 [&_a]:text-[10px] [&_a]:font-bold [&_a]:uppercase [&_a]:bg-purple-600 [&_a]:text-white [&_a]:border-none">
                        <NaVLink linkedTo={`/user/addreview/${order._id}`} Name={'Add Review'}/>
                      </div>
                    )
                  }

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
     <div data-aos="fade-right" data-aos-duration="500" className={`${color} rounded-2xl p-4 flex flex-col justify-between min-h-28`}>
      <h2 className="text-xs font-bold uppercase tracking-wider opacity-80">{title}</h2>
      <p className="text-2xl font-black tracking-tight mt-1">{value}</p>
      <span className="text-[10px] opacity-60 font-medium block mt-3">
        Updated today at {title === "Total Orders"? new Date().toLocaleString() : timeHrs > 9 ? `${timeHrs}:${timeMns} ${timeMode}` : `0${timeHrs}:${timeMns} ${timeMode}`}
      </span>
    </div>
  )
}