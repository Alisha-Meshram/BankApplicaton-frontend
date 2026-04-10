import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const Deposite = () => {
    const[amount,setAmount]=useState('')
    const [transactionpin,setTransactionPin]=useState('')
    const[error,setError]=useState("")
    const[success,setSuccess]=useState('')

    const Deposite=async(e)=>{
e.preventDefault()
setError('')
setSuccess('')
try {
    const token=localStorage.getItem('token')
    const res=await axios.post('http://localhost:7000/api/transaction',{type:'deposite',amount,transactionpin},{headers:{Authorization:`Bearer ${token}`}})
    console.log(res.data)
    toast.success("Deposite Successfull 💰")
    setSuccess('deposite successfull')
    setAmount('')
    setTransactionPin('')
} catch (error) {
    setError('')
  toast.error(error?.response?.data?.message || 'server error')  
}
    }


  return (
   <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Deposite Money</h2>

        <form onSubmit={Deposite} className="space-y-4">
         

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
          >Deposite 
          </button>

          {error && (<p className='text-red-500 mt-2 text-sm'>{error}</p>)}
        </form>
      </div>
    </div>
    <ToastContainer />
   
</>
  )
}

export default Deposite
