import React, { useEffect, useState} from 'react'
// import AddDepartment from './AddDepartment'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepButton } from '../../utils/DepartmentHelper'
import axios from 'axios'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)

  useEffect( ()=> {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const res = await axios.get('http://localhost:5000/api/department')

        if(res.data.success){
     
          let sno = 1;
          const data = await res.data.departments.map( (dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepButton _id={dep._id}/>

          }));
          setDepartments(data);
        }
      } catch (error) {
        if(error.res && !error.res.data.success){
          alert(error.res.data.error)
        }
        
      }finally{
        setDepLoading(false)
      }
    }

    fetchDepartments()
  },[])


  return (
    <> {depLoading ? <div> Loading...</div>: 
    <div className='p-5'>
    <div className='text-center'>
      <h3 className='text-2xl font-bold'> Manage Departments</h3>
    </div>
    <div className='flex justify-between items-center'>
      <input type='text' placeholder='Search By Dep Name' className='px-4 py-0.5 bg-white rounded shadow'/>
     <Link to="/admin-dashboard/add-department" className='px-4 py-1 text-white bg-teal-600 rounded shadow'> Add New Department</Link>
      
    </div>

    <div className='mt-5'>
      <DataTable columns={columns} data={departments} />
    </div>
    </div> }</>
  )
}

export default DepartmentList
