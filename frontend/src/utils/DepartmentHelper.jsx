import axios from "axios"
import { useNavigate } from "react-router-dom"


export const  columns = [
    {
        name: "S No",
        selector : (row) =>row.sno
    },
    
    {
        name: "Department Name",
        selector : (row) =>row.dep_name
    },
    {
        name: "Action",
        selector : (row) =>row.action

    },

]

export const DepButton = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()

    const handleDelete = async (_id) => {
        const confirm = window.confirm("Do you want to delete?")
        if(confirm){

        try {
            const res = await axios.delete(`http://localhost:5000/api/department/${_id}`)

            if (res.data.success) {
                onDepartmentDelete(_id)
            }

        } catch (error) {
            if (error.res && !error.res.data.success) {
                alert(error.res.data.error);
            }
        }
    }
    }


    return (
        <div  className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white rounded"
            onClick={()=>{ navigate(`/admin-dashboard/department/${_id}`) }}
            > Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white rounded"
             onClick={()=> handleDelete(_id)}
            > Delete</button>

        </div>
    )
}