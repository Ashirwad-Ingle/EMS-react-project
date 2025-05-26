
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

export {addLeave ,getList}