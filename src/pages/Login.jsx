import axios from "axios";
import React, { useContext, useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthDataContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const{serverUrl}=useContext(AuthDataContext)
const navigate=useNavigate()
  const login = async (e) => {
    setErr("");
    e.preventDefault();
    try {
      const res = await axios.post(`${serverUrl}/auth/loginUser`, {
        email,
        password,
      });

   localStorage.setItem('token',res.data.token)
      setEmail("");
      setPassword("");
      console.log(res.data, "data");
      toast.success("Login Successfull 🔑")
      navigate('/user/dashboard')
    } catch (error) {
      console.log(error);
      setErr(err.response.data.message);
      toast.err(err?.response?.data?.message || 'server error')  
    }
  };
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-gray-200">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Bank Account Login
        </h2>

        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label className="font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 "
              required
            />
            {!showPassword && (
              <IoIosEye
                className="absolute  right-3 top-[38px] cursor-pointer text-gray-600"
                onClick={() => setShowPassword(true)}
              />
            )}
            {showPassword && (
              <IoIosEyeOff
                className="absolute  right-3 top-[38px] cursor-pointer text-gray-600"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>

          {err.length > 0 && <p className="text-red">*{err}</p>}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Sign In
          </button>
          <p className="text-blue-900 text-center cursor-pointer" onClick={()=>{navigate('/register')}}>Sign up</p>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Login;
