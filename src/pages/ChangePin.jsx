import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ChangePin = () => {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const ChangePin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (newPin !== confirmPin) {
      return setError("New pin and  Confirm Pin must match");
    }
    try {
      const res = await axios.post(
        "http://localhost:7000/api/user/change-pin",
        { currentPin, newPin,confirmPin},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data);
     
      

      toast.success("Change Transaction Pin Successfully.")

      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
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
      onSubmit={ChangePin}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Change Transaction PIin
      </h3>
  
      <input
        type="password"
        name="currentPin"
        placeholder="Current Pin"
        value={currentPin} onChange={(e)=>{setCurrentPin(e.target.value)}}
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
  
      <input
        type="password"
        name="newPin"
        placeholder="New Pin"
        value={newPin} onChange={(e)=>{setNewPin(e.target.value)}}
        className="w-full mb-3 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
  
      <input
        type="password"
        name="confirmPin"
        placeholder="Confirm Pin"
        value={confirmPin} onChange={(e)=>{setConfirmPin(e.target.value)}}
        className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
  
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Update Transaction Pin
      </button>
      {error && (
  <p className="text-red-500 mt-2 text-sm">{error}</p>
)}
    </form>
    <ToastContainer />
  </div>
  );
};

export default ChangePin;
