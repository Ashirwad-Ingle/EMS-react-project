import express from "express";
import cors from "cors";

import connectToDB from "./database/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";

const app = express();


connectToDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/emp', employeeRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
