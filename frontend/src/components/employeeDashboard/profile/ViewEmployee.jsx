import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewEmployee = () => {
    const { id } = useParams();
 
   
    const [employee, setEmployee] = useState(null); // fix: use null, not [null]
    const [loading, setLoading] = useState(true);   // fix: explicit loading state

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/emp/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (res.data.success) {
             
                    setEmployee(res.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);  // fix: set loading false regardless of success or failure
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10 text-lg font-semibold">Loading...</div>;
    }

    if (!employee) {
        return <div className="text-center mt-10 text-red-500">Employee not found.</div>;
    }

    return (
        <div className="mx-auto max-w-3xl mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className='text-2xl font-bold mb-8 text-center'>Employee Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img
                        src={`http://localhost:5000/${employee.userId.profileImage}`}
                        alt="Employee"
                        className='rounded-full border w-72'
                    />
                </div>
                <div className="space-y-4 text-md ">
                    <p className=''><strong>Name:</strong> {employee.userId.name}</p>
                    <p className=''><strong>Employee ID:</strong> {employee.employeeId}</p>
                    <p className=''><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
                    <p className=''><strong>Gender:</strong> {employee.gender}</p>
                    <p className=''><strong>Department:</strong> {employee.department?.dep_name || 'N/A'}</p>
                    <p className=''><strong>Marital Status:</strong> {employee.maritalStatus}</p>
                 
                </div>
            </div>
        </div>
    );
};


export default ViewEmployee
