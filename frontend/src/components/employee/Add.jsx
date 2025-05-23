import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');

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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage') {
            setFormData((prev) => ({ ...prev, profileImage: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formPayload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
            formPayload.append(key, val);
        });

        try {
            const res = await axios.post('http://localhost:5000/api/emp/add', formPayload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                navigate('/admin-dashboard/employees');
            } else {
                setError(res.data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error adding employee:', err);
            setError(err.response?.data?.message || 'Server error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>

            {error && (
                <div className="mb-4 p-3 text-red-600 border border-red-300 bg-red-50 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Name', name: 'name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Employee ID', name: 'employeeId', type: 'text' },
                        { label: 'Date of Birth', name: 'dob', type: 'date' },
                        { label: 'Designation', name: 'designation', type: 'text' },
                        { label: 'Salary', name: 'salary', type: 'number' },
                        { label: 'Password', name: 'password', type: 'password' },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-sm font-medium text-gray-700">{label}</label>
                            <input
                                type={type}
                                name={name}
                                onChange={handleChange}
                                value={formData[name] || ''}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    ))}

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            onChange={handleChange}
                            value={formData.gender || ''}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                        <select
                            name="maritalStatus"
                            onChange={handleChange}
                            value={formData.maritalStatus || ''}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Marital Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            name="department"
                            onChange={handleChange}
                            value={formData.department || ''}
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

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            onChange={handleChange}
                            value={formData.role || ''}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
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
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default Add;
