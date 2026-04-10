import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const PrivateRoute = () => {

  
    const token =localStorage.getItem('token')
   const navigate= useNavigate()

   useEffect(()=>{
if(!token){
    return navigate('/')
}
   },[token,navigate])

   const location =useLocation()
   const active=location.pathname

  return token ? (
    <div className="min-h-screen bg-gray-100 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg hidden md:block">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="bg-white shadow-sm px-6 py-4">
          <Navbar />
        </div>

        {/* Page Content */}
        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-md p-6 min-h-[60vh]">
          <Outlet>
            
          </Outlet>  
          </div>
        </div>

      </div>
    </div>
  ):null;
};

export default PrivateRoute;