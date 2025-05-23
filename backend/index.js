import express from "express";
import cors from "cors";

import connectToDB from "./database/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js"

const app = express();


connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))


app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/emp', employeeRouter);
app.use('/api/salary',salaryRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
