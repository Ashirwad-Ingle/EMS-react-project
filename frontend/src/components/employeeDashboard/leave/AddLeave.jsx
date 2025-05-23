import React from 'react'

const AddLeave = () => {
  return (<>
    <div className='mx-w-4xl mx-auto mt-10 bg-white rounded-md shadow-md p-8'>
      <h2 className='text-2xl font-bold text-center mb-6'>Request To Leave</h2>
    </div>
    <form >
        <div className='flex flex-col space-y-6'>
            <div>
                <label className=' block text-sm font-medium text-gray-700'>
                    Leave Type
                </label>
                <select 
                name="leaveType" className='mt-1 p-2 block w-full border-gray-300 rounded-md'
                required>
                    <option value="" > Select Type of Leave </option>
                    <option value="sickLeave" >Sick Leave </option>
                    <option value="casaulLeave" >Casual Leave </option>
                    <option value="annualLeave" >Annual Leave </option>

                </select>
            </div>
        </div>
    </form>
  </>
  
  )
}

export default AddLeave
