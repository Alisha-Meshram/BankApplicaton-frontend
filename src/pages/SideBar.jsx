import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiArrowFatLineDownBold, PiArrowFatLineUpBold } from "react-icons/pi";
import { TbBrandGoogleHome } from "react-icons/tb";
import { MdTimeline } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { AuthDataContext } from "../context/AuthContext";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const active = location.pathname;

  const [userName, setUserName] = useState("");

  const {serverUrl}=useContext(AuthDataContext)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${serverUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(res.data.name);
      } catch (error) {
        console.log("Error fetching user", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menu = [
    { name: "Home", path: "/user/dashboard", icon: <TbBrandGoogleHome /> },
    {
      name: "Deposit",
      path: "/user/deposite",
      icon: <PiArrowFatLineDownBold />,
    },
    { name: "Send", path: "/user/send", icon: <PiArrowFatLineUpBold /> },
    { name: "History", path: "/user/history", icon: <MdTimeline /> },
    { name: "Logout", action: "logout", icon: <FiLogOut /> },
  ];

  return (
    <>
      {/* 🔹 Desktop Sidebar */}
      <div
        className="hidden md:flex flex-col w-64 
h-[calc(100vh-4rem)] 
bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 
text-white shadow-2xl 
fixed h-full  z-40 "
      >
        {/* Header */}
        <div className="p-6 text-center border-b border-white/20 backdrop-blur-md">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 className="text-lg font-semibold tracking-wide">
            Hello, {userName || "User"}
          </h1>
          <p className="text-xs text-white/70 mt-1">Welcome back 👋</p>
        </div>

        {/* Menu */}
        <ul className="flex-1 p-4 space-y-3">
          {menu.map((item, index) => {
            const isActive = active === item.path;

            return item.action === "logout" ? (
              <li
                key={index}
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer 
                hover:bg-red-500/20 transition-all duration-300 group"
              >
                <span className="text-lg group-hover:scale-110 transition">
                  {item.icon}
                </span>
                <span className="group-hover:translate-x-1 transition">
                  {item.name}
                </span>
              </li>
            ) : (
              <Link to={item.path} key={index}>
                <li
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-white text-blue-700 shadow-lg scale-[1.02]"
                      : "hover:bg-white/10"
                  }`}
                >
                  <span className="text-lg group-hover:scale-110 transition">
                    {item.icon}
                  </span>
                  <span className="group-hover:translate-x-1 transition">
                    {item.name}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="p-4 text-center text-xs text-white/60 border-t border-white/10">
          © 2026 MyBank
        </div>
      </div>

      {/* 🔹 Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t shadow-lg flex justify-around py-2 md:hidden z-50">
        {menu.map((item, index) => (
          <div key={index}>
            {item.action === "logout" ? (
              <button onClick={handleLogout}>
                <div className="flex flex-col items-center text-xs text-red-500">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </button>
            ) : (
              <Link to={item.path}>
                <div
                  className={`flex flex-col items-center text-xs transition-all duration-200
                  ${
                    active === item.path
                      ? "text-blue-600 scale-110 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBar;
