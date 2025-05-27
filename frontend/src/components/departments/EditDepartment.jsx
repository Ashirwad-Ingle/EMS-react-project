import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditDepartment = () => {
    const navigate = useNavigate()
    const {id} = useParams()

    // const [department,setDepartment] = useState(null)
    const [depLoading,setDepLoading] = useState(false)

    const [department, setDepartment] = useState({
        dep_name: '',
        description: ''
      });



    useEffect( ()=>{
        const fetchDepartments =async () => {
            setDepLoading(true)
            try {
                
                const res = await axios.get(`http://localhost:5000/api/department/${id}`)
       
                if(res.data.success){
                
                setDepartment(res.data.department)
                }
            } catch (error) {
                if(error.res && !error.res.data.success){
                    alert(error.message)
                }
                
            }finally{
             setDepLoading(false)
            }
        }
        fetchDepartments()
    },[])

    const handleChange = (e) => {
        const {name, value} = e.target
        setDepartment( {...department, [name] :value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.put(`http://localhost:5000/api/department/${id}`,department)
            if(res.data.success){
             
                navigate('/admin-dashboard/departments')
            }
        } catch (error) {
            if(error.res && !error.res.data.success){
                alert(error.message)
            }
              
        }
    }

  
  return (
    <> {depLoading ?  <div>Loading...</div> :
    < div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      
    <h2  className='text-2xl font-bold mb-6'> Edit Department</h2>
    <form onSubmit={handleSubmit}>
        <div className="">
            <label htmlFor="dep_name"
            className='text-sm font-medium text-gray-700'
            >Department Name</label>
            <input type='text' placeholder='Enter your Department Name'
            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
            name='dep_name'
            value= {department.dep_name}
            onChange={handleChange}
            required
            />
        </div>
        <div className="">
            <label htmlFor="description"
            className='text-sm font-medium text-gray-700'
            >Description</label>
            <textarea  name='description' placeholder='Description'
            value = {department.description}
            onChange={handleChange}
            className='mt-1 w-full p-2 border border-gray-300 rounded-md' rows="4"></textarea>
        </div>
      <button
      type='submit'
      className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
      > Update Department</button>
    </form>
  
</div>
}</>
  )
}

export default EditDepartment
