
import User from "../models/User.js"
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";


const login= async(req,res) => {
    

    try {
     
        
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
          return  res.status(404).json({success:false,error:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
         return res.status(404).json({success:false, error : "Enter Correct Password"})
        }

        const token = jwt.sign({_id:user._id, role:user.role},process.env.JWT_KEY, {expiresIn:"10d"})

      res.status(200).json({success :true, token , user: {_id:user._id, role:user.role, name:user.name }})


    } catch (error) {
     res.status(500).json({success:false, error : error.message})
    }

}
export {login}