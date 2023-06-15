import mongoose from 'mongoose';
import { IGenericErrorInterface } from '../interfaces/errorInterface';

const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorInterface[] = [
    {
      path: err.path,
      message: 'Invalid Id',
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast error',
    errorMessage: errors,
  };
};

export default handleCastError;
