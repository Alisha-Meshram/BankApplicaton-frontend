import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from "axios";


const Navbar = () => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:7000/api/user/balance", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(res.data.balance);
      } catch (error) {
        console.log("Error feaching balance", error);
      }
    };
    getData();
  }, []);
  return (
    <nav className=" w-full  ">
      <div className="mx-auto py-2 w-[96%] flex justify-between items-center">

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-auto">

          {/* Username + Profile */}
          <div className="flex items-center gap-2">
          <h4 className="text-black">Total Balance </h4>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold">
           ₹ {balance}
          </div>
            

            <Link to="/user/profile">
              <div className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full font-bold cursor-pointer">
              <FaUser size={16} />
              </div>
            </Link>
          </div>

          {/* Notification */}
          <div>
            {/* <NotificationBox /> */}
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;