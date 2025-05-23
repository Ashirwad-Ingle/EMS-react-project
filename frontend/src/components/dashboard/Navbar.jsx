import React from 'react'
import {useAuth} from '../../context/Context.jsx'

const Navbar = () => {
    const {user,logout} = useAuth()
  return (
    <div className={ `flex items-center text-white px-5 justify-between h-12 z ${user.role === "admin" ? "bg-teal-600" : "bg-blue-500"}`}>
      <p>welcome {user.name}</p>

   
      <button className=   { `px-4 py-1 rounded ${user.role === "admin" ? " bg-teal-700 hover:bg-teal-800 " : "bg-blue-600 hover:bg-blue-800"}`} onClick={logout}> Logout</button>
    </div>
  )
} 

export default Navbar
