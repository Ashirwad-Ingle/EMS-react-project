import Salary from '../models/Salary.js'

const addSalary = async (req,res)=> {
try {
    const {employeeId, basicSalary, allowances, deduction, payDate} =req.body;

    const totalSalary = parseInt(basicSalary) + parseInt(allowances) -parseInt(deduction)

    const newSalary = new Salary({
        employeeId, basicSalary, allowances, deduction, payDate, netSalary : totalSalary
    })

    await newSalary.save()

   return res.status(200).json({success:true})

} catch (error) {
    return res.status(500).json({success:false, error: "salary add server error"})
}
}


const getSalary =async (req,res) => {
    try {
 const {id} = req.params;
 const salary = await Salary.find({employeeId: id}).populate('employeeId', 'employeeId')
 return res.status(200).json({success:true,salary})
    } catch (error) {
        return res.status(500).json({success:false, error: "salary add server error"})
    }
}

export {addSalary,getSalary}