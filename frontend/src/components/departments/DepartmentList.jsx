import React from 'react'
import AddDepartment from './AddDepartment'
import { Link } from 'react-router-dom'


const DepartmentList = () => {
  return (
    <div className='p-5'>
    <div className='text-center'>
      <h3 className='text-2xl font-bold'> Manage Departments</h3>
    </div>
    <div className='flex justify-between items-center'>
      <input type='text' placeholder='Search By Dep Name' className='px-4 py-0.5 bg-white rounded shadow'/>
     <Link to="/admin-dashboard/add-department" className='px-4 py-1 text-white bg-teal-600 rounded shadow'> Add New Department</Link>
      
    </div>
    </div>
  )
}

export default DepartmentList
