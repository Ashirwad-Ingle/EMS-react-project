import express from 'express'
import { addEmployee, upload} from '../controllers/EmployeeController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router()


router.post('/add',authMiddleware,upload.single('image'), addEmployee)
// router.get('/',authMiddleware, getEmployee)
// router.get('/:id',authMiddleware, editEmployee)
// router.put('/:id',authMiddleware, updateEmployee)
// router.delete('/:id',authMiddleware, deleteEmployee)


export default router;