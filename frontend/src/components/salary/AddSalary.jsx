import React, { useEffect, useState } from 'react';
import { fetchDepartments, fetchEmployee as getEmployeesByDepartment } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddSalary = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employeeList, setEmployeeList] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');

    const [salaryData, setSalaryData] = useState({
        employeeId: '',
        basicSalary: '',
        allowances: '',
        deduction: '',
        payDate: '',
    });

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const deps = await fetchDepartments();
                setDepartments(deps);
            } catch (err) {
                console.error('Failed to fetch departments', err);
            }
        };
        getDepartments();
    }, []);

    const handleDepartmentChange = async (e) => {
        const departmentId = e.target.value;
        try {
            const emps = await getEmployeesByDepartment(departmentId);
            setEmployeeList(emps || []);
        } catch (err) {
            console.error('Failed to fetch employees by department', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalaryData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/salary/add', salaryData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.data.success) {
                navigate('/admin-dashboard/employees');
            } else {
                setError(res.data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error adding salary:', err);
            setError(err.response?.data?.message || 'Server error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Salary</h2>

            {error && (
                <div className="mb-4 p-3 text-red-600 border border-red-300 bg-red-50 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            onChange={handleDepartmentChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee</label>
                        <select
                            name="employeeId"
                            value={salaryData.employeeId}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Employee</option>
                            {employeeList.map((emp) => (
                                <option key={emp._id} value={emp._id}>
                                    {emp.employeeId}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                        <input
                            type="number"
                            name="basicSalary"
                            value={salaryData.basicSalary}
                            onChange={handleChange}
                            placeholder="Basic Salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Allowances</label>
                        <input
                            type="number"
                            name="allowances"
                            value={salaryData.allowances}
                            onChange={handleChange}
                            placeholder="Allowances"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Deduction</label>
                        <input
                            type="number"
                            name="deduction"
                            value={salaryData.deduction}
                            onChange={handleChange}
                            placeholder="Deduction"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                        <input
                            type="date"
                            name="payDate"
                            value={salaryData.payDate}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Salary
                </button>
            </form>
        </div>
    );
};

export default AddSalary;
