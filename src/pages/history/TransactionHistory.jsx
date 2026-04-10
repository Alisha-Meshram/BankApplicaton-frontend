import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HHeader from "./HHeader";
import { AuthDataContext } from "../../context/AuthContext";

const TransactionHistory = () => {
  const [transaction, setTransaction] = useState([]);
  const [totalSend, setTotalSend] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDeposite, setTotalDeposite] = useState(0);

  const navigate = useNavigate();
  const transactionPerPage = 5;

  const {serverUrl}=useContext(AuthDataContext)
  const retrive = (deposite, send) => {
    setTotalDeposite(deposite);
    setTotalSend(send);
  };
  useEffect(() => {
    const fetchTransaction = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${serverUrl}/transaction/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const transactions = res.data.getTransaction;

        setTransaction(transactions);
        console.log(res.data);

        const depositeTotal = transaction
          .filter((t) => t.type === "deposite")
          .reduce((acc, t) => acc + t.amount, 0);

        const sendTotal = transaction
          .filter((t) => t.type === "send")
          .reduce((acc, t) => acc + t.amount, 0);

        retrive(depositeTotal, sendTotal);
      } catch (error) {
        console.error(error);
        console.log(error?.response?.data);
      }
    };
    fetchTransaction();
  }, []);

  const totalPages = Math.ceil(transaction.length / transactionPerPage);
  const currentTransactions = transaction.slice(
    (currentPage - 1) * transactionPerPage,
    currentPage * transactionPerPage
  );

  const handleTransactionClick = (id) => {
    navigate(`/user/history/${id}`);
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto p-4">
        {/* <HHeader retrive={retrive} /> */}
        {/* <Graph /> */}

        {/* Transaction Info (Mobile Only) */}
        <div className="flex md:hidden items-center gap-4 mt-4">
          <div className="flex items-center gap-2 p-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-500">Deposit</span>
            <h6 className="mb-0 font-semibold">
              ${totalDeposite.toLocaleString()}
            </h6>
          </div>

          <div className="flex items-center gap-2 p-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-500">Sent</span>
            <h6 className="mb-0 font-semibold">
              ${totalSend.toLocaleString()}
            </h6>
          </div>
        </div>

        {/* Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {currentTransactions.length === 0 ? (
            <div className="text-center col-span-full">
              <p>No transactions found.</p>
            </div>
          ) : (
            currentTransactions.map((transaction) => (
              <div
                key={transaction._id}
                onClick={() => handleTransactionClick(transaction._id)}
                className="shadow rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-sm">
                  Transaction ID: {transaction._id}
                </h3>

                <p
                  className={`${
                    transaction.type === "deposite"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type === "deposite"
                    ? "↓ Deposit"
                    : "↑ Money Sent"}
                </p>

               
                  <p>
  {transaction.type === "send" && (
    <>To: {transaction.recipient?.name || "N/A"}</>
  )}

  {transaction.type === "deposite" && (
    <>By: {transaction.user?.name || "You"}</>
  )}

  {transaction.type !== "send" &&
    transaction.type !== "deposite" && (
      <>From: {transaction.sender?.name || "N/A"}</>
    )}
</p>
               
                <p>Amount: ₹{transaction.amount}</p>

                <p
                  className={`${
                    transaction.status === "Success"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  Status: {transaction.status}
                </p>

                <p>Date: {new Date(transaction.date).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
