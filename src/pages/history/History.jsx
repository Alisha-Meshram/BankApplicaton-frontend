import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";

const History = () => {
  const [transaction, setTransaction] = useState(null);
  const { transactionId } = useParams();
  const token=localStorage.getItem('token')

  useEffect(() => {
    axios
      .get(
        `http://localhost:7000/api/transaction/transaction/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setTransaction(res.data.transactionDetails))
      .catch(console.error.response);
  }, [transactionId, token]);

  
  if (!transaction) {
    return (
        <div className="loading-container">
            <ImSpinner9 animation="border" />
            <span className="loading-text">Loading...</span>
        </div>
    );
}
  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        Transaction History
      </h2>

      <div className="flex items-center justify-between p-4 mb-3 border rounded-xl hover:shadow-md transition">
        {/* Left Side */}
        <div>
          <p className="text-lg font-medium text-gray-800">
              {transaction.type}
            </p>

          <p className="text-sm text-gray-500">
            From: {transaction?.sender?.username|| "N/A"}
          </p>

          <p className="text-sm text-gray-500">
            To: {transaction?.recipient?.username || "N/A"}
          </p>
        </div>

        {/* Right Side */}
        <div className="text-right">
          <p
            className={`text-lg font-semibold ${
              transaction.type === "deposite" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "deposite" ? "+" : "-"} ₹{transaction.amount}
          </p>

          <p className="text-xs text-gray-400">
          {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default History;
