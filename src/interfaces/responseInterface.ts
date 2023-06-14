import { IGenericErrorInterface } from './errorInterface';

export type IGenericResponseInterface = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorInterface[];
};

// export type IAcademicSemester = {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: any;
// }
