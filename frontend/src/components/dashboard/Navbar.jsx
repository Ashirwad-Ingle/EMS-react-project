import React from 'react'
import {useAuth} from '../../context/Context.jsx'

const Navbar = () => {
    const {user} = useAuth()
  return (
    <div className='flex items-center text-white px-5 justify-between h-12 bg-teal-600'>
      <p>welcome {user.name}</p>
      <button className='px-4 py-1 bg-teal-700 hover:bg-teal-800 rounded'> Logout</button>
    </div>
  )
} 

export default Navbar
