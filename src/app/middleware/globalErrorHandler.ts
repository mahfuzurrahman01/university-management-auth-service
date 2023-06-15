import { ErrorRequestHandler } from 'express';
import { IGenericErrorInterface } from '../../interfaces/errorInterface';
import config from '../../config';
import handleValidationError from '../../errors/handleValidationError';
import ApiError from '../../errors/apiErrors';
// import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod';
import validationZodError from '../../errors/validationZodError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  let statusCode = 400;
  let message = 'something went wrong';
  const success = false;
  let errorMessages: IGenericErrorInterface[] = [];

  // eslint-disable-next-line no-unused-expressions
  // config.env === 'development'
  //   ? console.log('global error handler', err)
  //   : errorLogger.error('Global error handler', err)

  if (err instanceof ZodError) {
    const simplifiedError = validationZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: '',
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = 'Something went wrong';
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: '',
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
  //   res.status(400).json({
  //     bis: err,
  //   })
};

export default globalErrorHandler;
