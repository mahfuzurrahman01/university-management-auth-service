import express from 'express';
import { academicFacultyController } from './faculty.controller';
import validationRequest from '../../middleware/validationRequest';
import { facultyValidation } from './faculty.validation';

const router = express.Router();
router.post(
  '/create-faculty',
  validationRequest(facultyValidation.zodAcademicFacultySchema),
  academicFacultyController.createFaculty
);
router.get('/', academicFacultyController.getAllFaculties);
router.get('/:id', academicFacultyController.getASingleFaculty);
router.patch(
  '/:id',
  validationRequest(facultyValidation.zodAcademicFacultyUpdateSchema),
  academicFacultyController.updateFaculty
);
router.delete('/:id', academicFacultyController.deleteFaculty);
export const academicFacultyRouter = router;
