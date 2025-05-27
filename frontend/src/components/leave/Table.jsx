import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/LeaveHelper.jsx';
import axios from 'axios'


const Table = () => {
    const [leaves ,setLeaves] = useState()
    const [searchFilter, setSearchFilter] = useState([])
   


    const fetchLeaves = async ()=> {
  
        try {
            const res = await axios.get('http://localhost:5000/api/leave', {
              headers: {
                Authorization : `Bearer ${localStorage.getItem("token")}`
              }
            })
    
            if(res.data.success){
         
              let sno = 1;
              const data = await res.data.leaves.map( (leave) => ({
                _id: leave._id,
                sno: sno++,
                employeeId : leave.employeeId.employeeId,
                name:leave.employeeId.userId.name,
                leaveType: leave.leaveType,
                department: leave.employeeId.department.dep_name,
                days: new Date( leave.endDate).getDate() -
                      new Date (leave.startDate).getDate(),
                status: leave.status,
    
                action:(<LeaveButtons  _id = {leave._id}/> ) 
    
              }));
           


              setLeaves(data);
              setSearchFilter(data)
            
            }
        }catch(error) {
            if(error.res && !error.res.data.success){
                alert(error.res.data.error)
              }
              
            }
            }

useEffect( () => {





    fetchLeaves()
},[])

const searchFilterData = async(e) => {
   const data = e.target.value.toLowerCase()

   const filter = leaves.filter( (leave) => leave.leaveType.toLowerCase().includes(data) || leave.name.toLowerCase().includes(data) ||
  leave.department.toLowerCase().includes(data) || leave.employeeId.toLowerCase().includes(data)   )

   setSearchFilter(filter)
}
const searchByButton = async(status) => {
   const data = status.toLowerCase()

   const filter = leaves.filter( (leave) => leave.status.toLowerCase().includes(data)  )

   setSearchFilter(filter)
}


  return (

    <div className='p-6 bg-gray-100'>
        <div className='text-center '>
            <h3 className='text-2xl font-bold mb-3'> Manage Leaves</h3>
        </div>
        <div className="flex justify-between items-center mb-5">
            <input type=' text'
             className='px-10 py-1 border rounded-md border-gray-200 shadow-sm bg-white'
             placeholder='Search By Leave Type '
             onChange={searchFilterData}/>
      
        <div>

        <button className='px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded-md text-white me-4 
       ' onClick ={()=> searchByButton('pending')}
        >Pending</button>
        <button className='px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded-md text-white me-4 gap-4
        'onClick ={()=> searchByButton('rejected')}
        >Rejected</button>
        <button className='px-4 py-1 bg-teal-600 hover:bg-teal-700 rounded-md text-white  gap-4
        'onClick ={()=> searchByButton('approved')}
        >Approved</button>
        </div>
        </div>

        <DataTable  columns={columns}  data={searchFilter} pagination/>


    </div>
  )
}

export default Table
