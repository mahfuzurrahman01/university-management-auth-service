import express from 'express';
import { academicSemesterRouter } from '../modules/Academic-semester/academic.routes';
import { userRouter } from '../modules/user/user.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
