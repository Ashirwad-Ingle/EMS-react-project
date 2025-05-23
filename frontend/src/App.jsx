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
import List from './components/employee/List.jsx'
import Add from './components/employee/Add.jsx'
import View from './components/employee/View.jsx'
import Edit from './components/employee/Edit.jsx'
import AddSalary from './components/salary/AddSalary.jsx'
import ViewSalary from './components/salary/ViewSalary.jsx'
import Summary from './components/employeeDashboard/dashboard/Summary.jsx'
import ViewEmployee from './components/employeeDashboard/profile/ViewEmployee.jsx'
import LeaveEmployee from './components/employeeDashboard/leave/LeaveEmployee.jsx'
import AddLeave from './components/employeeDashboard/leave/AddLeave.jsx'


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
          <Route path="/admin-dashboard/employees" element={<List />}></Route>
          <Route path="/admin-dashboard/add-employee" element={<Add />}  ></Route>
          <Route path="/admin-dashboard/employee/:id" element={<View />}  ></Route>
          <Route path="/admin-dashboard/employee/edit/:id" element={<Edit />}  ></Route>
          <Route path="/admin-dashboard/employee/salary/:id" element={<ViewSalary />}  ></Route>

          {/*  salary */}
          <Route path="/admin-dashboard/salary" element={<AddSalary />}  ></Route>
        </Route>


        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>

        }>
          <Route index element={<Summary />} ></Route>
           {/* profile */}
          <Route path="/employee-dashboard/profile/:id" element={<ViewEmployee />}  ></Route>
          {/* leave */}
          <Route path="/employee-dashboard/leave" element={<LeaveEmployee />}  ></Route>
          <Route path="/employee-dashboard/leave/add-Leave" element={<AddLeave />}  ></Route>

        </Route>

      </Routes>


    </BrowserRouter>
  )
}

export default App
