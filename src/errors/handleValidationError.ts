import mongoose from 'mongoose';

import { IGenericResponseInterface } from '../interfaces/responseInterface';
import { IGenericErrorInterface } from '../interfaces/errorInterface';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericResponseInterface => {
  const errors: IGenericErrorInterface[] = Object.values(err.errors).map(
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
