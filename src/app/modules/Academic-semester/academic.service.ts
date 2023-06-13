import ApiError from '../../../errors/apiErrors';
import status from 'http-status';
import { academicSemesterTitleCodeMapper } from './academic.constant';
import { IAcademic } from './academic.interface';
import { academicSemester } from './acedemic.model';

const createSemester = async (payload: IAcademic): Promise<IAcademic> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await academicSemester.create(payload);
  return result;
};

export const academicSemesterService = {
  createSemester,
};
