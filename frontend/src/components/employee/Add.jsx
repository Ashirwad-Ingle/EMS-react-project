import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const navigate = useNavigate()
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})

    useEffect(() => {
        const getFetchDepartment = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getFetchDepartment()
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })
        try {
            const res = await axios.post('http://localhost:5000/api/emp/add', formDataObj, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            if (res.data.success) {
                navigate('/admin-dashboard/employees')
            }

        } catch (error) {
            if (error.res && !error.res.data.success) {
                alert(error.res.data.error)
            }
        }
    }



    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === "image") {
            setFormData((pre) => ({ ...pre, [name]: files[0] }))
        } else {
            setFormData((pre) => ({ ...pre, [name]: value }))

        }
    }



    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>

            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className='block text-sm font-medium text-gray-700'> Name</label>
                        <input
                            onChange={handleChange}
                            type='text' placeholder='Enter Name' name='name'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>
                    {/* email */}
                    <div>
                        <label htmlFor="" className='block text-sm font-medium text-gray-700'> Email</label>
                        <input
                            onChange={handleChange}
                            type='email' placeholder='Enter Email' name='email'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>
                    {/* Employee Id */}
                    <div>
                        <label htmlFor="employeeId" className='block text-sm font-medium text-gray-700'> Employee ID</label>
                        <input
                            onChange={handleChange}
                            type='text' placeholder='Employee Id' name='employeeId'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>
                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dob" className='block text-sm font-medium text-gray-700'> Date of Birth </label>
                        <input
                            onChange={handleChange}
                            type='date' placeholder='DOB' name='dob'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>
                    {/* Gender*/}
                    <div>
                        <label htmlFor="gender" className='block text-sm font-medium text-gray-700'> Gender </label>
                        <select
                            name='gender'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female </option>
                            <option value="other">Other </option>
                        </select>
                    </div>

                    {/* Marital Status*/}
                    <div>
                        <label htmlFor="dob" className='block text-sm font-medium text-gray-700'> Marital Status </label>
                        <select
                            name='maritalStatus'
                            onChange={handleChange}
                            placeholder='Marital Status'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Single</option>
                            <option value="female">Married </option>

                        </select>
                    </div>
                    {/* Designation*/}
                    <div>
                        <label htmlFor="designation" className='block text-sm font-medium text-gray-700'> Designation </label>
                        <input
                            onChange={handleChange}
                            type='text' placeholder='Designation' name='designation'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>
                    {/* Department*/}
                    <div>
                        <label htmlFor="department" className='block text-sm font-medium text-gray-700'> Department </label>
                        <select
                            name='department'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        >      <option value="">Select Department</option>
                             {departments.map(dep => (
                                <option key={dep._id} value={dep.dep_name}> {dep.dep_name}</option>
                            ))}

                        </select>
                    </div>
                    {/* Salary*/}
                    <div>
                        <label htmlFor="salary" className='block text-sm font-medium text-gray-700'> Salary </label>
                        <input
                            onChange={handleChange}
                            type='number' placeholder='Salary' name='salary'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>
                    {/* password*/}
                    <div>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700'> Password </label>
                        <input
                            onChange={handleChange}
                            type='password' placeholder='******' name='password'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>
                    {/* Role*/}
                    <div>
                        <label htmlFor="role" className='block text-sm font-medium text-gray-700'> Role </label>
                        <select
                            name='role'
                            onChange={handleChange}
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        >      <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>

                    </div>
                    {/* Image Upload*/}
                    <div>
                        <label htmlFor="image" className='block text-sm font-medium text-gray-700'> Upload Image </label>
                        <input
                            type='file' placeholder='Upload Image' name='image'
                            onChange={handleChange}
                            accept="image/*"
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required
                        />
                    </div>

                </div>

                <button
                    type='submit'
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>
                    Add Employee
                </button>

            </form>

        </div>
    )
}

export default Add
