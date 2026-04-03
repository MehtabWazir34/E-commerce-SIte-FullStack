import { useState } from "react";
import { ORDER_STATUS_RULES } from "../Utility/changeStatus.js";
import axiosInstance from '../Utility/axiosInstance.js'

export default function OrderStatusDropdown({ orderId, currentStatus, role }) {

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const allowedStatuses = ORDER_STATUS_RULES[role] || [];

  const STATUS_STYLES = {
    Pending: "bg-yellow-600/85",
    Processing: "bg-blue-600/85",
    Shipping: "bg-purple-600/85",
    Delivered: "bg-green-600/85",
    Cancel: "bg-red-600/85",
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
    <div className="flex gap-3 items-center">

      {/* 🔵 ADMIN UI */}
      {role === "admin" ? (
        <>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`cursor-pointer
              ${STATUS_STYLES[status]}
              border border-[#ffe2af]/30
              rounded-xl
              px-3 py-2
              focus:outline-none
            `}
          >
            {allowedStatuses.map((s) => (
              <option
                key={s}
                value={s}
                className="bg-[#2c3936] cursor-pointer text-[#ffe2af]"
              >
                {s}
              </option>
            ))}
          </select>

          <button
            onClick={handleUpdate}
            disabled={loading || status === currentStatus}
            className="
              bg-[#ffe2af]
              text-[#2c3936]
              px-4 py-2
              rounded-xl
              font-semibold
              disabled:opacity-40
            "
          >
            Update Status
          </button>
        </>
      ) : (
        /* 🟡 USER UI */
        <button
          onClick={handleCancelOrder}
          disabled={loading || isCancelDisabled}
          className="
            bg-[#ffe2af]
            text-[#2c3936]
            px-4 py-2
            rounded-xl
            font-semibold
            disabled:opacity-40
          "
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}