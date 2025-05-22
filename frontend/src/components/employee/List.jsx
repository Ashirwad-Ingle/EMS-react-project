import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'
const EmployeeList = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
 
  const [searchEmp, setSearchEmp] = useState([])


  useEffect( ()=> {
    const fetchDepartments = async () => {
      setEmpLoading(true)
      try {
        const res = await axios.get('http://localhost:5000/api/emp', {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        })

        if(res.data.success){
     
          let sno = 1;
          const data = await res.data.employees.map( (emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name:emp.userId.name,
            dob: new Date (emp.dob).toLocaleDateString(),
            profileImage: <img src={ `http://localhost:5000/${emp.userId.profileImage}`} width={40} className='rounded-full   '/> ,
            action:(<EmployeeButtons  _id = {emp._id}/> ) 

          }));
          setEmployees(data);
          setSearchEmp(data)
        }
      } catch (error) {
        if(error.res && !error.res.data.success){
          alert(error.res.data.error)
        }
        
      }finally{
        setEmpLoading(false)
      }
    }

    fetchDepartments()
  },[])

  const handleSearch =(e)=> {
    const filter = employees.filter( (emp)=> emp.name.toLowerCase().includes(e.target.value.toLowerCase()))

    setSearchEmp(filter)
  }

  return (
    <div className='p-5'> 
      <div className="text-center">
        <div className="text-2xl font-bold "> Manage Employee</div>
      </div>
      <div className="flex justify-between items-center"> 
        <input  
        type='text'
        placeholder='Search By Dep Name' 
        className='px-4 py-1 bg-white shadow rounded '
        onChange={handleSearch}
        />
        <Link to='/admin-dashboard/add-employee'
        className='px-4 py-1 bg-teal-600 text-white rounded shadow'
        > Add New Employee</Link>

      </div>
      <div className='pt-5'>
        < DataTable columns={columns}  data={searchEmp} pagination/>
      </div>
       

    </div>
  )
}

export default EmployeeList
