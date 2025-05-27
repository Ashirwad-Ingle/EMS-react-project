import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewSalary = () => {
    const [salary, setSalary] = useState([]);
    const [filteredSalary, setFilteredSalary] = useState([]);
    const { id } = useParams();

    const fetchSalary = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.data.success) {
                setSalary(res.data.salary);
                setFilteredSalary(res.data.salary);
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
        fetchSalary();
    }, []);

   

    return (
        <>
            {filteredSalary.length === 0 ? (
                <div className="text-center py-10">No Record Found</div>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold">Salary History</h2>
                    </div>


                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-2 px-4 border border-gray-200">S.No</th>
                                <th className="py-2 px-4 border border-gray-200">Employee ID</th>
                                <th className="py-2 px-4 border border-gray-200">Basic Salary</th>
                                <th className="py-2 px-4 border border-gray-200">Allowances</th>
                                <th className="py-2 px-4 border border-gray-200">Deduction</th>
                                <th className="py-2 px-4 border border-gray-200">Total</th>
                                <th className="py-2 px-4 border border-gray-200">Pay Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalary.map((entry, index) => {
                               

                                return (
                                    <tr key={entry._id} className="border-t">
                                        <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                                        <td className="py-2 px-4 border border-gray-200">{entry.employeeId.employeeId}</td>
                                        <td className="py-2 px-4 border border-gray-200">{entry.basicSalary}</td>
                                        <td className="py-2 px-4 border border-gray-200">{entry.allowances}</td>
                                        <td className="py-2 px-4 border border-gray-200">{entry.deduction}</td>
                                        <td className="py-2 px-4 border border-gray-200 font-semibold">{entry.netSalary}</td>
                                        <td className="py-2 px-4 border border-gray-200">
                                            {new Date(entry.payDate).toLocaleDateString()}
                                        </td>
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

export default ViewSalary;

