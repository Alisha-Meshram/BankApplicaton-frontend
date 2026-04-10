import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDataContext } from "../context/AuthContext";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState("");
  const [transaction, setTransaction] = useState([]);
  const navigate = useNavigate();

  const {serverUrl}=useContext(AuthDataContext)

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/api/user/balance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(res.data.balance);
      } catch (error) {
        console.log("Error feaching balance", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.name);
      } catch (error) {
        console.log("Error feaching balance", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="my-4 px-4">
      {/* Balance Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 to-indigo-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-lg">Welcome</h4>
            <h2 className="text-2xl font-semibold">{userName}</h2>
          </div>

          <div className="text-right">
            <h6 className="text-white/70">Available Balance</h6>
            <h1 className="text-3xl font-bold">
              ₹{balance?.toLocaleString() || 0}
            </h1>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold">Recent Transactions</h5>

          <button
            className="text-blue-500 no-underline hover:underline cursor-pointer"
            onClick={() => {
              navigate("/user/history");
            }}
          >
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
