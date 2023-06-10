import { ZodError, ZodIssue } from 'zod';
import { IGenericResponseInterface } from '../interfaces/responseInterface';
import { IGenericErrorInterface } from '../interfaces/errorInterface';

const validationZodError = (error: ZodError): IGenericResponseInterface => {
  const errors: IGenericErrorInterface[] = error.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      };
    }
  );
  const statusCode = 400;
  const message = 'validation Error';
  return {
    statusCode,
    message,
    errorMessage: errors,
  };
};

export default validationZodError;
