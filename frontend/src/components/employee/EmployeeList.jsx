import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeList = () => {
  return (
    <div className='p-5'> 
      <div className="text-center">
        <div className="text-2xl font-bold "> Manage Employee</div>
      </div>
      <div className="flex justify-between items-center"> 
        <input  type='text' placeholder='Search By Dep Name' 
        className='px-4 py-1 bg-white shadow rounded '
        />
        <Link to='/admin-dashboard/add-employee'
        className='px-4 py-1 bg-teal-600 text-white rounded shadow'
        > Add New Employee</Link>

      </div>
       

    </div>
  )
}

export default EmployeeList
