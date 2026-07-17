import { useState, useEffect } from "react";
import { ORDER_STATUS_RULES } from "../Utility/changeStatus.js";
import axiosInstance from '../Utility/axiosInstance.js'

export default function OrderStatusDropdown({ orderId, currentStatus, role }) {

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const allowedStatuses = ORDER_STATUS_RULES[role] || [];

  const STATUS_STYLES = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Processing: "bg-blue-50 text-blue-700 border-blue-200",
    Shipping: "bg-purple-50 text-purple-700 border-purple-200",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Cancel: "bg-rose-50 text-rose-700 border-rose-200",
  };

  // 🚀 Common API function
  const updateOrderStatus = async (newStatus) => {
    try {
      setLoading(true);

      await axiosInstance.patch(
        `/user/${orderId}/status`,
        { orderStatus: newStatus }
      );
      setStatus(newStatus);
      alert("Status updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Admin update
  const handleUpdate = () => {
    if (status !== currentStatus) {
      updateOrderStatus(status);
    }
  };

  // ✅ Direct cancel for user
  const handleCancelOrder = () => {
    updateOrderStatus("Cancel");
  };

  // ❗ Disable cancel if already Shipping or delivered
  const isCancelDisabled =
    status === "Shipping" || status === "Delivered" || status === "Cancel";

  return (
    <div className="flex gap-3 items-center font-sans antialiased text-gray-800">

      {/* 🔵 ADMIN UI */}
      {role === "admin" ? (
        <>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`cursor-pointer
              ${STATUS_STYLES[status] || 'bg-gray-50 text-gray-700 border-gray-200'}
              border
              rounded-full
              text-xs
              font-bold
              uppercase
              tracking-wider
              px-4 py-2.5
              focus:outline-none
              transition-all
            `}
          >
            {allowedStatuses.map((s) => (
              <option
                key={s}
                value={s}
                className="bg-white text-gray-700 font-semibold text-xs lowercase"
              >
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={handleUpdate}
            disabled={loading || status === currentStatus}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-purple-600 text-white shadow-sm shadow-purple-100 disabled:opacity-40 cursor-pointer"
          >
            Update Status
          </button>
        </>
      ) : (
        /* 🟡 USER UI */
        <button
          onClick={handleCancelOrder}
          disabled={loading || isCancelDisabled}
          className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all bg-gray-100 border border-gray-200 text-gray-600 disabled:opacity-40 cursor-pointer hover:bg-gray-200"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}