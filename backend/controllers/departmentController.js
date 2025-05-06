import Department from "../models/Department.js";

const addDepartment =  async(req,res) => {
    try {
        const {dep_name,description} =req.body;
       const newDep = new Department ({
        dep_name,
        description
       })
        
       await newDep.save()
       return res.status(200).json({success:true, department: newDep})
        
    } catch (error) {
        return res.status(500).json({success:false, error: "add department server error"})
    }
}


const getDepartments = async (req,res) => {
    try{
        const departments = await Department.find()
        return res.status(200).json({success:true,departments})
    }
    catch(error){
        return res.status(500).json({success:false, error: "get department server error"})
    }
}


const editDepartments = async (req,res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById({ _id:id})
        return res.status(200).json({success:true, department, user :id})
        
    } catch (error) {
        return res.status(500).json({success:false, error: "edit department server error"})
    }

  
}


const updateDepartments = async (req,res) => {
    try {
        const {id} = req.params;
        const{dep_name, description} = req.body;
        const department = await Department.findByIdAndUpdate({_id: id}, {dep_name: dep_name, description})
        return res.status(200).json({success:true, department})
        
    } catch (error) {
        return res.status(500).json({success:false, error: "edit department server error"})
    }
}
export {addDepartment, getDepartments ,editDepartments,updateDepartments}