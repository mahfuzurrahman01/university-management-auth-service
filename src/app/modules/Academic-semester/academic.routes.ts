import express from 'express';
import validationRequest from '../../middleware/validationRequest';
import { academicValidation } from './academic.validation';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validationRequest(academicValidation.zodAcademicSemesterSchema)
  //   userController.createUserToDb
);

export const academicSemesterRouter = router;
