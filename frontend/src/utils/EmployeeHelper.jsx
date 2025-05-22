import axios from "axios"
import { useNavigate } from "react-router-dom"

 export const fetchDepartments = async ()=> {
    let departments
    try {

        const res = await axios.get('http://localhost:5000/api/department', {
            headers : { 
                Authorization : ` Bearer ${localStorage.getItem('token')}`,
            },
        })
        if (res.data.success){
            departments = res.data.departments
        }
        
    } catch (error) {
        if(error.res && !error.res.data.success){
            alert(error.res.data.error);
        }
    }
    return departments
}




export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
         width: "180px"
    },
    {
        name: "Image",
        selector: (row) =>row.profileImage,
        sortable: false,
         width: "120px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
          width: "220px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
          width: "120px"
    },
    {
        name: "Actions",
        selector: (row) => <EmployeeButtons _id={row._id} />,
        center:"true"
     
    }
];

export const EmployeeButtons = ({ _id }) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-3">
            <button
                className="px-3 py-1 bg-teal-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
            >
                View
            </button>
            <button className="px-3 py-1 bg-yellow-600 text-white rounded"
             onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">Salary</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded">Leave</button>
        </div>
    );
};
  