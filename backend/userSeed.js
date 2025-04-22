import User from "./models/User.js"
import bcrypt from "bcrypt"
import connectToDB from "./database/db.js"

const userRegister = async() => {

    connectToDB()
    try {
        const pass = await bcrypt.hash("admin",10)
        const newUser = new User({
            name : "Admin",
            email : "admin@gmail.com",
            password : pass,
            role: "admin"

        })

        await newUser.save()
    } catch (error) {
        console.log(error)
    }
}

userRegister()