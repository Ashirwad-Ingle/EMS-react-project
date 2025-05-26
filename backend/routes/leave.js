


import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave , getList} from '../controllers/leaveController.js';





const router = express.Router();

router.post('/add', authMiddleware, addLeave);
 router.get('/:id',authMiddleware, getList)
// router.get('/:id',authMiddleware, getEmployee)
// router.put('/edit/:id',authMiddleware, updateEmployee)
// router.get('/department/:id',authMiddleware, fetchEmployee)

export default router;
