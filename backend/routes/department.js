import express from 'express'
import { addDepartment, getDepartments ,editDepartments,updateDepartments} from '../controllers/departmentController.js'



const router = express.Router()


router.post('/add',addDepartment)
router.get('/',getDepartments)
router.get('/:id',editDepartments)
router.put('/:id',updateDepartments)


export default router;