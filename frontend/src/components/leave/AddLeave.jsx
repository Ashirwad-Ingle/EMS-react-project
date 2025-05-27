import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Context';

const AddLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user?._id || '', // Fallback in case user is null initially
    leaveType: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/leave/add', leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
    
        navigate('/employee-dashboard');
      }
    } catch (error) {
      console.error('Leave submission error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="m-10">
      <div className="max-w-4xl mx-auto mt-10 bg-white rounded-md shadow-md p-8">
        <div className="border-b border-gray-300 mb-6">
          <h2 className="text-2xl font-bold text-center">Request To Leave</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-6">
            {/* Leave Type */}
            <div>
              <label className="block text-md font-medium text-gray-700">Leave Type</label>
              <select
                name="leaveType"
                value={leave.leaveType}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Type of Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-md font-medium text-gray-700">From Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={leave.startDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-md font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={leave.endDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-md font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={leave.description}
                onChange={handleChange}
                placeholder="Short description"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md h-24 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-md"
            >
              Add Leave
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
