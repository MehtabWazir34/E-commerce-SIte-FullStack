// components/OrderStatusDropdown.jsx
import { useState } from "react";
// import api from "../utils/api";
import { ORDER_STATUS_RULES } from "../Utility/changeStatus.js";
import axios from "axios";

export default function OrderStatusDropdown({ orderId, currentStatus, role }) {
    // if (!role || !orderId) return null;

  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const allowedStatuses = ORDER_STATUS_RULES[role] || [];
const STATUS_STYLES = {
  Pending: "bg-yellow-600/85",
  Processing: "bg-blue-600/85",
  Delivered: "bg-green-600/85",
  Cancelled: "bg-red-600/85",
};
  const updateStatus = async () => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:3400/user/${orderId}/status`, {
        orderStatus: status
      }, {headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }});
      alert("Status changed successfully!");
      window.location.reload();
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
  onChange={(e) => setStatus(e.target.value)}
  className={` cursor-pointer
    // bg-[#2c3936]
    // text-[#ffe2af]
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
      className={"bg-[#2c3936] cursor-pointer text-[#ffe2af]"}
    >
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
