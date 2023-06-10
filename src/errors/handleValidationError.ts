import mongoose from 'mongoose';
import { IGenericInterface } from '../interfaces/errorInterface';
import { IGenericResponseInterface } from '../interfaces/responseInterface';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericResponseInterface => {
  const errors: IGenericInterface[] = Object.values(err.errors).map(
    (ele: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: ele?.path,
        message: ele?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Its a validation error',
    errorMessage: errors,
  };
};

export default handleValidationError;
