import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academic.service';

import { sendResponse } from '../../../shared/sendResponse';
import status from 'http-status';
import catchAsync from '../../../shared/catchAsync';
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...semesterData } = req.body;
    const result = await academicSemesterService.createSemester(semesterData);
  
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Semester created successfully',
      data: result,
    });
    next();
  }
);

export const academicSemesterController = {
  createSemester,
};
