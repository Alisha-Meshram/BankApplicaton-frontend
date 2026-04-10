import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthDataContext } from "../context/AuthContext";

const SendMoney = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [transactionpin, setTransactionPin] = useState("");
  const [success, setSuccess] = useState("");

  const {serverUrl}=useContext(AuthDataContext)

  useEffect(() => {
    const fetchUser =async () => {
      try {
        const token = localStorage.getItem("token");
        const res =await axios.get(`${serverUrl}/api/user/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchUser();
  }, []);

  const sendMoney =async (e) => {
    e.preventDefault();
    try {
        setError("")
        setSuccess('')
      const token = localStorage.getItem("token");
      const res =await axios.post(
        `${serverUrl}/api/transaction`,
        { type: "send",recipient: recipient, amount: Number(amount), transactionpin:transactionpin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(res.data);
      setAmount("");
      setRecipient("");
      setTransactionPin("");
      setSuccess("send money successfull");
      toast.success("Money Sent Successfully 📤")

    } catch (error) {
      console.log(error.response);
      setError(error.response?.data?.message || "Transaction failed")
      toast.error(error?.response?.data?.message || 'server error')  
    }
  };
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Send Money</h2>

        <form onSubmit={sendMoney} className="space-y-2">
          <div>
            <label className="block text-sm font-medium mb-1">Recipient</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Recipient</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} 
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Transaction pin
            </label>
            <input
              type="password"
              value={transactionpin}
              onChange={(e) => setTransactionPin(e.target.value)}
              placeholder="Enter recipient user ID"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit Transaction
          </button>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default SendMoney;
