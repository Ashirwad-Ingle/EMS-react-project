import express from "express";
import cors from "cors";
const app = express()
import authRouter from "./routes/auth.js"
import  connectToDB   from "./database/db.js";
import  departmentRouter from "./routes/department.js"
import  employeeRouter from "./routes/employee.js"

connectToDB ()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT ${process.env.PORT}`)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


// import cors from 'cors'
// import express from 'express'
// import authRouter from './routes/auth.js'
// import connectToDB from './database/db.js'
// connectToDB()

// const app = express()

// app.use(cors())
// app.use(express.json())
// app.use('/api/auth',authRouter)

// const PORT = process.env.PORT || 5000
// app.listen(PORT , ()=> {
//     console.log (` server is running on PORT ${PORT}`)
// })