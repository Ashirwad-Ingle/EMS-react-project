import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    designation: (req,file, cb)=>{
        cb(null, "public/uploads")
    },
    filename: (req,file,cb) => {
        cb (null,Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

const addEmployee = async (req,res) =>{
const{
    name,
    email,
    employeeId,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,
    role,

} =req.body

const user = await User.findOne({email})
if (user){
    return res.status(400).json({success:false,error: "user already registered in employee"})
}
const hashpassword = await bcrypt.hash(password, 10)

const newUser = new user( {
    name, 
    email,
    password,
    role,

})




}

export {addEmployee,upload}
