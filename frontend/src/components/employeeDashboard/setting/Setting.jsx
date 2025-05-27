import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from '../../../context/Context'
import { useNavigate } from 'react-router-dom'

const Setting = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [password, setPassword] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        cPassword: ""
    })

    const [error,setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }))

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password.newPassword !== password.cPassword){
            setError ("Password Not Matched..!")
        }else{
            
        try {
            const res = await axios.put('http://localhost:5000/api/setting/change-password', password, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            if (res.data.success) {
                   navigate('/employee-dashboard')
            }
        } catch (error) {
           console.log(error.message)
        }

        }


    }

    return (
        <>
            <div className='bg-gray-100'>
                <div className='max-w-xl  mx-auto mt-10 p-5 bg-white rounded-md shadow-md '>
                    <div >
                        <h3 className=' font-bold text-xl my-2 '> Change Password: </h3>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* oldpassword */}
                        <div className='mb-2'>
                            <label className=' text-gray-700 mb-2 ' > Old Password:</label>
                            <input type='password' className='w-full border border-gray-200 rounded-md py-2 mt-2 ps-4   text-gray-700 mb-2 ' placeholder='Enter Old Password'
                                name='oldPassword'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* newPassword */}
                        <div className='mb-2'>
                            <label className=' text-gray-700 mb-2 ' > New Password:</label>
                            <input  type='password'
                            className='w-full border border-gray-200 rounded-md py-2 mt-2 ps-4   text-gray-700 mb-2 ' placeholder='Enter New Password'
                                name='newPassword'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {/* cPassword */}
                        <div className='mb-2'>
                            <label className=' text-gray-700 mb-2 ' > Confirm Password:</label>
                            <input type='password' className='w-full border border-gray-200 rounded-md py-2 mt-2 ps-4   text-gray-700 mb-2 ' placeholder='Repeat Password'
                                name='cPassword'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type='submit' className='bg-blue-600 rounded-md w-full  text-white p-2 font-medium  '> Change Password</button>
                    </form>

                </div>
            </div>


        </>
    )
}

export default Setting
