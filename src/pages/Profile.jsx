import React, { useEffect, useState } from "react";
import ChangePass from "./ChangePass";
import ChangePin from "./ChangePin";
import axios from "axios";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [balance, setBalance] = useState(0);
  const [error,setError]=useState('')

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:7000/api/auth/me",
       
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(res.data)
        setUserName(res.data.name)
      } catch (error) {
        console.log(error)
        setError(error.response?.data?.message || "Something went wrong")
      }
    };
    getProfile();
  }, []);

  useEffect(()=>{

    const getBalance=async()=>{
        const token=localStorage.getItem('token')
        try {
           const res= await axios.get("http://localhost:7000/api/user/balance",{headers:{Authorization: `Bearer ${token}`}})

           console.log(res.data)
           setBalance(res.data.balance)
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.message || "Something went wrong")
        }
    }

    getBalance()
   
  },[])
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Balance Section - FULL WIDTH */}
      <div className="w-full bg-blue-600 text-white rounded-2xl shadow-lg p-6 mb-6 text-center">
      <h2 className="text-lg font-semibold">Welcome {userName}</h2>
        <h2 className="text-lg font-semibold">Available Balance</h2>
        <p className="text-3xl font-bold mt-2">  ₹{Number(balance).toLocaleString()}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Change Password Card */}

        <ChangePass />
        {/* Change PIN Card */}
        <ChangePin />
      </div>
    </div>
  );
};

export default Profile;
