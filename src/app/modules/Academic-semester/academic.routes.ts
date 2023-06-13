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

export const academicSemesterRouter = router;
