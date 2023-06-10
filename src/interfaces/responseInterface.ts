import { IGenericErrorInterface } from './errorInterface';

export type IGenericResponseInterface = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorInterface[];
};
