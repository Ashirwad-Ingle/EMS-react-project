


import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave , getList, getLeaves,getLeaveDetails, updateLeave} from '../controllers/leaveController.js';





const router = express.Router();

router.post('/add', authMiddleware, addLeave);
 router.get('/:id',authMiddleware, getList);
 router.get('/',authMiddleware,getLeaves);
 router.get( '/detail/:id',authMiddleware,getLeaveDetails);
 router.put('/:id',authMiddleware, updateLeave);



export default router;
