import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { academicValidation } from './academic.validation';
import { academicSemesterController } from './academic.controller';

const router = express.Router();

router.post(
  '/create-Semester',
  validationRequest(academicValidation.zodAcademicSemesterSchema),
  academicSemesterController.createSemester
);
router.patch(
  '/:id',
  validationRequest(academicValidation.UpdateZodAcademicSemesterSchema),
  academicSemesterController.updateSemester
);
router.get('/:id', academicSemesterController.getSingleSemester);
router.get('/', academicSemesterController.getAllSemesters);
router.delete('/:id', academicSemesterController.deleteSemester);
export const academicSemesterRouter = router;
