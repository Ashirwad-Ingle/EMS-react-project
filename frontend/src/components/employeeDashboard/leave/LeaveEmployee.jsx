import React from 'react'
import{Link}from 'react-router-dom'

const LeaveEmployee = () => {
  return (
    <div className='p-5'> 
    <div className="text-center">
      <div className="text-2xl font-bold "> Manage Leaves</div>
    </div>
    <div className="flex justify-between items-center"> 
      <input  
      type='text'
      placeholder='Search By Dep Name' 
      className='px-4 py-1 bg-white shadow rounded '
    //   onChange={handleSearch}
      />
      <Link to='/employee-dashboard/leave/add-leave'
      className='px-4 py-1 bg-blue-600 text-white rounded shadow'
      > Add New Leave</Link>

    </div>
  

  </div>
  )
}

export default LeaveEmployee
