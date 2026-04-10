
import './App.css'
import Registration from './pages/Registration'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import SendMoney from './pages/SendMoney'
import Deposite from './pages/Deposite'
import Profile from './pages/Profile'
import Navbar from './pages/Navbar'
import Dashboard from './pages/Dashboard'
import SideBar from './pages/SideBar'
import PrivateRoute from './pages/PrivateRoute'

import History from './pages/history/History'
import TransactionHistory from './pages/history/TransactionHistory'
import Logout from './pages/Logout'


function App() {
  

  return (
    <>
    <Routes>
      <Route path='/register' element={<Registration />} />
      <Route path='/login' element={<Login />} />

      <Route path="/user" element={<PrivateRoute />}>
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='send' element={<SendMoney />} />
      <Route path='deposite' element={<Deposite />} />
      <Route path='profile' element={<Profile />} />
      

<Route path='history' element={<TransactionHistory />} />
      <Route path='history/:transactionId' element={<History />} />
      </Route>
     
      <Route path='/' element={<Login />} />
   
      <Route path='logout' element={<Logout />} />
  
    </Routes>
     
   
    </>
  )
}

export default App
