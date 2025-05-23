import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Department from "../models/Department.js"

// Normalize upload directory path
const uploadDir = path.join("public", "uploads");

// Ensure upload folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage with file validation
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValidType =
        allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
        allowedTypes.test(file.mimetype);

    if (isValidType) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

// ========================
// 🚀 Add Employee Controller
// ========================
const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        // Basic validation
        if (!name || !email || !password || !role || !employeeId || !department || !salary) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(department)) {
            return res.status(400).json({
                success: false,
                message: "Invalid department ID",
            });
        }

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        });

        const savedUser = await newUser.save();
      

        // Create and save employee
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(200).json({
            success: true,
            message: "Employee and user created successfully!",
            user: savedUser,
            employee: newEmployee,
        });

    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create employee",
            error: error.message,
            details: error.errors || {},
        });
    }
};


const getEmployees = async(req,res) => {
try {
    const employees =await Employee.find().populate('userId',{password :0}).populate('department')
    return res.status(200).json({success:true, employees})
} catch (error) {
    return res.status(500).json ({success:true, error:"get employees server error"})
}
}


const getEmployee = async (req, res) => {
    const { id } = req.params;
    let employee;
  
    try {
      
      employee = await Employee.findById({_id: id})
        .populate('userId', { password: 0 })
        .populate('department');
  
      
      if (!employee) {
        employee = await Employee.findOne({ userId: id })
          .populate('userId', { password: 0 })
          .populate('department');
      }
  
      return res.status(200).json({ success: true, employee });
    } catch (error) {
      return res.status(500).json({ success: false, error: "get employees server error" });
    }
  };
const updateEmployee = async (req,res)=> {
    try {
       const {name, designation, maritalStatus,department,role ,salary} =req.body;
       const {id} =req.params
       
       const updateEmployee = await Employee.findById({_id : id})
       if(!updateEmployee){
        return res.status(400).json({success:false, error: "employee not exist"})
       }
       
       const checkUser = await User.findById({_id :updateEmployee.userId })
       
       if(!checkUser){
        return res.status(400).json({success:false, error: "User not exist"})
       }

       const updateUser = await User.findByIdAndUpdate( {_id: updateEmployee.userId} , {name,role})

       const updateEmp = await Employee.findByIdAndUpdate({ _id: id} , { designation, maritalStatus, department, salary})

       if (!updateUser || !updateEmp) {
        return res.status(404).json({sucess:false, error:"document not found"})
       }

       return res.status(200).json({success:true, message:"employee update successfully"})

    } catch (error) {
        return res.status(500).json({success:false, error: "update employee server error"})
        
    }
}


const fetchEmployee = async (req,res) =>{
    try {
        const {id} =req.params;
        const employees = await Employee.find({ department : id})
        return res.status(200).json({success:true,employees})

        
    } catch (error) {
        return res.status(500).json({ success:false, error : "getfetch employee server"})
    }
}



export { addEmployee, upload ,getEmployees,getEmployee, updateEmployee , fetchEmployee};
