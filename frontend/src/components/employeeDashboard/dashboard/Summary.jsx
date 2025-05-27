import React from 'react'

import { useAuth } from '../../../context/Context'

const Summary = () => {
    const { user } = useAuth()
  
    return (
        <div className='rounded flex bg-white m-5'>
            <div className={`text-3xl flex justify-center items-center bg-blue-600 text-white px-4`}>

                <img src={`http://localhost:5000/${user.profileImage}`} alt=""
                    className='w-10 rounded' />
            </div>
            <div className='pl-4 py-1'>
                <p className='text-lg font-semibold'>Welcome Back</p>
                <p className='text-xl font-bold'>{user.name}</p>
            </div>

        </div>
    )

}

export default Summary
