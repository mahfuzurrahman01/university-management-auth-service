import express from 'express';
import { userController } from './user.controller';
import validationRequest from '../../middleware/validationRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validationRequest(userValidation.zodCreateUserSchema),
  userController.createUserToDb
);

export const userRouter = router;
