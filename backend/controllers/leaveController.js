
import Leave from "../models/Leave.js"
import Employee from "../models/Employee.js";



const addLeave = async (req,res) => {
    try {
        const { userId, leaveType, startDate, endDate, description} = req.body;

             const employee = await Employee.findOne({userId})

        const leave =  new Leave({
            employeeId :employee._id, leaveType, startDate, endDate, description
        })

        await leave.save()
        return res.status(200).json({success:true,  leave})
        
        
    } catch (error) {
        return  res.status(500).json({success: false, error : "leave add server error"})
    }
}

const getList = async (req,res) => {
    try {
        const {id} = req.params;

        const employee = await Employee.findOne({userId :id})

        const leaves = await Leave.find({ employeeId: employee._id})
        return res.status(200).json ({success :true, leaves})

    } catch (error) {
        return res.status(500).json({success:false, error : "leave add server error"})
    }
}


const getLeaves = async( req, res)=> {
    try {
        const leaves = await Leave.find().populate({
            path:"employeeId",
            populate : [
                { 
                    path : 'department',
                    select : 'dep_name'
                },
                {
                    path : 'userId',
                    select: 'name'
                }
            ]
        })
        return res.status(200).json ({success :true, leaves})

    } catch (error) {
        return res.status(500).json({success:false, error : "leave add server error"})
    }
}

const getLeaveDetails = async (req,res) => {
try {
    const {id} = req.params;

    const leave = await Leave.findById({_id :id}).populate({
        path : "employeeId",
        populate:[
            {
                path: 'department',
                select: 'dep_name'
            },
            {
                path: 'userId',
                select: ['name', 'profileImage']
         
            }
        ]
    })
    return res.status(200).json({success:true, leave})
} catch (error) {
        return res.status(500).json({success:false, error : "leave add server error"})
    
}
}


const updateLeave = async(req, res) =>{

  try {
    const {id} = req.params;
    const {status} =req.body

    const leave = await Leave.findByIdAndUpdate({_id: id}, { status:status})

    if(!leave){
        return res.status(404).json({success:false, error : "leave not found"})
        
    }
    
    return res.status(200).json({success:true, leave})
} catch (error) {
    console.log(error.message)
        return res.status(500).json({success:false, error : "leave add server error"})
    
}
}


export {addLeave ,getList ,getLeaves, getLeaveDetails, updateLeave}