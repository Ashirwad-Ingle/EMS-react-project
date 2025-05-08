import express from 'express';
import { addEmployee, upload } from '../controllers/EmployeeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, upload.single('image'), addEmployee);

export default router;
