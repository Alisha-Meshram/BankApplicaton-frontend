import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ChangePass = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");


  const ChangePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (newPassword !== confirmPassword) {
      return setError("New password and  Confirm password must match");
    }
    try {
      const res = await axios.post(
        "http://localhost:7000/api/user/change-password",
        { currentPassword, newPassword,confirmPassword},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data);
     
      

      toast.success("Change password Successfully.")

      setCurrentPassword("");
      setNewPassword("");
      setconfirmPassword("");
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data);
      setError(error?.response?.data?.message || "Error changing message");
    }
  };



  return (
    <div>
      <form
        className="flex-1 bg-white rounded-2xl shadow-md p-6"
        onSubmit={ChangePassword}
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Change Password
        </h3>

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setconfirmPassword(e.target.value);
          }}
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Update Password
        </button>
        {error && (
  <p className="text-red-500 mt-2 text-sm">{error}</p>
)}
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePass;
