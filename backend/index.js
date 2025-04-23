import express from "express";
import cors from "cors";
const app = express()
import authRouter from "./routes/auth.js"
import  connectToDB   from "./database/db.js";
connectToDB ()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on PORT ${process.env.PORT}`)
})

