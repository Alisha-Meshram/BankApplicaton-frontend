import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
const Logout = () => {
    const navigate=useNavigate()
    const logout=()=>{
localStorage.removeItem('token')
navigate('/login')
    }
  return (
    <div>
      <button
      onClick={logout}
      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
    >
      <FiLogOut />
      Logout
    </button>
    </div>
  )
}

export default Logout
