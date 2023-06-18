import express from 'express';
import { academicSemesterRouter } from '../modules/Academic-semester/academic.routes';
import { userRouter } from '../modules/user/user.routes';
import { academicFacultyRouter } from '../modules/Academic-faculty/faculty.router';
import { academicDepartmentRouter } from '../modules/Academic-Department/department.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
