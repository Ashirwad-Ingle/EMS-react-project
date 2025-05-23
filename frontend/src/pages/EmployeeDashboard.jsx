import React from 'react'
// import { useAuth } from '../context/Context'
import { Outlet, useNavigate } from 'react-router-dom'

import Navbar from '../components/dashboard/Navbar'
import Sidebar from '../components/employeeDashboard/Sidebar'




const EmployeeDashboard = () => {
  
  // const{user}  = useAuth()
  // const navigate = useNavigate()
  // if(!user){
  //   navigate('/login')
  // }


  return (
    <div className='flex'> 
    <Sidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
     <Navbar/>
     <Outlet/>
    </div>
    </div>
  )
}

export default EmployeeDashboard
