import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: '',
    designation: '',
    maritalStatus: '',
    department: '',
    role: '',
    salary: '',
  });

  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/emp/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success && res.data.employee) {
          const emp = res.data.employee;

          setEmployee({
            name: emp.userId?.name || '',
            designation: emp.designation || '',
            maritalStatus: emp.maritalStatus || '',
            department: emp.department?._id || '',
            role: emp.userId?.role || '',
            salary: emp.salary || '',
          });
        } else {
          setError(res.data.message || 'Failed to load employee data.');
        }
      } catch (err) {
        console.error('Fetch employee error:', err);
        setError(err.response?.data?.message || 'Server error while fetching employee');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const deps = await fetchDepartments();
        setDepartments(deps);
      } catch (err) {
        console.error('Failed to fetch departments:', err);
        setError('Could not load departments.');
      }
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.put(`http://localhost:5000/api/emp/edit/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        navigate('/admin-dashboard/employees');
      } else {
        setError(res.data.message || 'Something went wrong during update.');
      }
    } catch (err) {
      console.error('Error editing employee:', err);
      setError(err.response?.data?.message || 'Server error during update');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading employee data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>

      {error && (
        <div className="mb-4 p-3 text-red-600 border border-red-300 bg-red-50 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={employee.name}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              value={employee.designation}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
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
              value={employee.department}
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
              value={employee.role}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={employee.salary}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default Edit;
