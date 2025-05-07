import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AdminDashboard from './pages/AdminDashboard.jsx'
import Login from './pages/Login.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import RoleBaseRoutes from './utils/RoleBaseRoutes.jsx'
import AdminSummary from './components/dashboard/AdminSummary.jsx'

import DepartmentList from './components/departments/DepartmentList.jsx'
import AddDepartment from './components/departments/AddDepartment.jsx'
import EditDepartment from './components/departments/EditDepartment.jsx'
import EmployeeList from './components/employee/EmployeeList.jsx'
import AddEmployee from './components/employee/AddEmployee.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard'
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>}>

          <Route index element={<AdminSummary />} ></Route>

          {/*  department */}
          <Route path="/admin-dashboard/departments" element={<DepartmentList />}  ></Route>
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />}  ></Route>
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}  ></Route>

          {/*  employee */}
          <Route path="/admin-dashboard/employee" element={<EmployeeList />}></Route>
        <Route path='/admin-dashboard/add-employee' element={<AddEmployee/>}></Route>



        </Route>
        <Route path='/employee-dashboard' element={<EmployeeDashboard />}></Route>

      </Routes>


    </BrowserRouter>
  )
}

export default App
