import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
 
    const [leave, setLeave] = useState(null);
    const [loading, setLoading] = useState(true);   
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
             
                    setLeave(res.data.leave);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);  
            }
        };

        fetchLeave();
    }, [id]);


    const changeStatus = async( id,status)=> {
      
          try {
                const res = await axios.put(`http://localhost:5000/api/leave/${id}`,{status} ,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
                 
             navigate('/admin-dashboard/leave')
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }}
      


    }

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }

    if (!leave) {
        return <div className="text-center mt-10 text-red-500">Employee not found.</div>;
    }

    return (
        <div className="mx-auto max-w-3xl mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                        alt="Employee"
                        className='rounded-full border w-72'
                    />
                </div>
                <div className="space-y-4 text-md ">
                    <p className=''><strong>Name:</strong> {leave.employeeId.userId.name}</p>
                    <p className=''><strong>Employee ID:</strong> {leave.employeeId.employeeId}</p>
                    <p className=''><strong>LeaveType:</strong> {leave.leaveType}</p>
                    <p className=''><strong>Reason:</strong> {leave.description}</p>
                    <p className=''><strong>Department:</strong> {leave.employeeId.department?.dep_name || 'N/A'}</p>
                    <p className=''><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
                    <p className=''><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
                    <div>
                        {leave.status === "pending" ?  (
                            <div className='flex space-x-2'>
                                <button className='px-4 py-1 text-white rounded-md shadow-md bg-green-500 hover:bg-green-600'
                                onClick={()=> changeStatus(leave._id,"approved")}> Approve</button>
                                <button className='px-4 py-1 text-white rounded-md shadow-md bg-red-500 hover:bg-red-600'
                                onClick={()=> changeStatus(leave._id,"rejected")}> Reject</button>

                            </div>
                        ) : <p className='font-medium'> {leave.status}</p> }
                    </div>



                    

                 
                </div>
            </div>
        </div>
    );
};

export default Details;
