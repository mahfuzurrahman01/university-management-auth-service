import express from 'express';
import { AcademicDepartmentController } from './department.controller';
import { departmentValidation } from './department.validation';
import validationRequest from '../../middleware/validationRequest';
const router = express.Router();

router.post(
  '/create-department',
  validationRequest(departmentValidation.zodAcademicDepartmentSchema),
  AcademicDepartmentController.createDepartment
);

router.get('/', AcademicDepartmentController.getAllFaculties);
router.patch(
  '/:id',
  validationRequest(departmentValidation.updateAcademicDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);

export const academicDepartmentRouter = router;
