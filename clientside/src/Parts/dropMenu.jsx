// components/OrderStatusDropdown.jsx
import { useState } from "react";
// import api from "../utils/api";
import { ORDER_STATUS_RULES } from "../Utility/changeStatus.js";
import axios from "axios";

export default function OrderStatusDropdown({ orderId, currentStatus, role }) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const allowedStatuses = ORDER_STATUS_RULES[role] || [];

  const updateStatus = async () => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:3400/user/${orderId}/status`, {
        orderStatus: status
      }, {headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }});
    } catch (err) {
      alert("Not allowed to change status",err);
      setStatus(currentStatus);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <select
        value={status}
        disabled={loading}
        onChange={(e) => setStatus(e.target.value)}
        className="
          bg-[#2c3936]
          text-[#ffe2af]
          border border-[#ffe2af]/30
          rounded-xl
          px-3 py-2
          focus:outline-none
        "
      >
        {allowedStatuses.map((s) => (
          <option key={s} value={s} className="bg-[#2c3936]">
            {s}
          </option>
        ))}
      </select>

      <button
        onClick={updateStatus}
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
        Update
      </button>
    </div>
  );
}
