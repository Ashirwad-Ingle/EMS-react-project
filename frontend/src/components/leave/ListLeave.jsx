

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Context';


const ListLeave = () => {
    const [leave, setLeave] = useState([]);
    const [filterLeave, setFilterLeave] = useState([]);
    const { user } = useAuth()
    let index = 1

    const fetchLeave = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.data.success) {
                setLeave(res.data.leaves);

                setFilterLeave(res.data.leaves);
            }
        } catch (error) {
            console.error('Error fetching salary:', error);
            if (error.response && error.response.data?.error) {
                alert(error.response.data.error);
            } else {
                alert('Something went wrong');
            }
        }
    };

    useEffect(() => {
        fetchLeave();
    }, []);

    const searchLeave = (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = leave.filter((s) =>
            s.leaveType.toLowerCase().includes(search)
        );
        setFilterLeave(filtered);
    };

    return (
        <>
            <div className='p-5'>                                  {/* header section */}
                <div className="text-center  p-5">
                    <div className="text-2xl font-bold "> Manage Leaves</div>
                </div>
                <div className="flex justify-between items-center">
                    <input
                        type='text'
                        placeholder='Search By leave Type'
                        className='px-4 py-1 bg-white shadow rounded '
                        onChange={searchLeave}
                    />
                    <Link to='/employee-dashboard/leave/add'
                        className='px-4 py-1 bg-blue-600 text-white rounded shadow'
                    > Add New Leave</Link>

                </div>
            </div>


            {leave.length === 0 ? (
                <div className="text-center py-10">No Record Found</div>
            ) : (



                <div className="overflow-x-auto p-5">



                    <table className="min-w-full bg-white border rounded-md">
                        <thead>
                            <tr className="bg-white text-left">
                                <th className="py-2 px-4 border border-gray-200">S.No</th>
                                <th className="py-2 px-4 border border-gray-200">Leave Type</th>
                                <th className="py-2 px-4 border border-gray-200">From </th>
                                <th className="py-2 px-4 border border-gray-200">To</th>
                                <th className="py-2 px-4 border border-gray-200">Reason</th>
                                <th className="py-2 px-4 border border-gray-200">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filterLeave.map((entry, index) => {


                                return (
                                    <tr key={entry._id} className="border-t ">
                                        <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                                        <td className="py-2 px-4 border border-gray-200">{entry.leaveType}</td>
                                        <td className="py-2 px-4 border border-gray-200">
                                            {new Date(entry.startDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 border border-gray-200">
                                            {new Date(entry.endDate).toLocaleDateString()}
                                        </td>

                                        <td className="py-2 px-4 border border-gray-200">{entry.description}</td>
                                        <td className="py-2 px-4 border border-gray-200">{entry.status}</td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ListLeave;

