
import { useState } from "react";
import axios from "axios";
import { ROLE_OPTIONS } from "../Utility/changeStatus.js";

export default function UserRoleDropdown({ userId, currentRole }) {
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  const updateRole = async () => {
    try {
      setLoading(true);
      await axios.patch(
        `http://localhost:3400/user/${userId}/role`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      window.location.reload();
      alert("Role changed successfully!");
    } catch (err) {
      alert("Role change not allowed");
      setRole(currentRole);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-[#2c3936] text-[#ffe2af] border border-[#ffe2af]/30 rounded-xl px-3 py-2"
      >
        {ROLE_OPTIONS.map(r => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <button
        onClick={updateRole}
        disabled={loading || role === currentRole}
        className="bg-[#ffe2af] text-[#2c3936] px-4 py-2 rounded-xl font-semibold disabled:opacity-40"
      >
        Update
      </button>
    </div>
  );
}
