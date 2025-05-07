import axios from "axios"


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

