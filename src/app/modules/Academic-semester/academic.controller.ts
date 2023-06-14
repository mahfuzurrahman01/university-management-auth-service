import { Request, Response } from 'express';
import { academicSemesterService } from './academic.service';

import { sendResponse } from '../../../shared/sendResponse';
import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { IAcademic } from './academic.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { filterFields } from '../../../constants/filter';
const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...semesterData } = req.body;
  const result = await academicSemesterService.createSemester(semesterData);

  sendResponse<IAcademic>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester created successfully',
    data: result,
    meta: {
      page: 0,
      limit: 0,
      total: 0,
    },
  });
});
//get all semesters
const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filterProperties = pick(req.query, filterFields);
  const paginationProperties = pick(req.query, paginationFields);

  const result = await academicSemesterService.getSemesters(
    filterProperties,
    paginationProperties
  );
  sendResponse<IAcademic[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrieved all semesters',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSemester = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicSemesterService.getSemesterWithId(id);
  sendResponse<IAcademic>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrieved this semester',
    data: result,
  });
};

export const academicSemesterController = {
  getSingleSemester,
  createSemester,
  getAllSemesters,
};
