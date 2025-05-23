import express from 'express';
import { addEmployee, upload,getEmployees,getEmployee,updateEmployee,fetchEmployee } from '../controllers/EmployeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, upload.single('profileImage'), addEmployee);
router.get('/',authMiddleware, getEmployees)
router.get('/:id',authMiddleware, getEmployee)
router.put('/edit/:id',authMiddleware, updateEmployee)
router.get('/department/:id',authMiddleware, fetchEmployee)

export default router;
