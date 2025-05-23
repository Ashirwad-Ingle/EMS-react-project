

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addSalary,getSalary } from '../controllers/salaryController.js';



const router = express.Router();

router.post('/add', authMiddleware, addSalary);
router.get('/:id',authMiddleware, getSalary)
// router.get('/:id',authMiddleware, getEmployee)
// router.put('/edit/:id',authMiddleware, updateEmployee)
// router.get('/department/:id',authMiddleware, fetchEmployee)

export default router;
