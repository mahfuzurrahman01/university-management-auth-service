import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicFacultyService } from './faculty.service';
import { sendResponse } from '../../../shared/sendResponse';
import status from 'http-status';
import { IAcademicFaculty } from './faculty.interface';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './faculty.constant';
import { paginationFields } from '../../../constants/pagination';
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;
  const result = await academicFacultyService.createFaculty(facultyData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filterProperties = pick(req.query, academicFacultyFilterableFields);
  const paginationProperties = pick(req.query, paginationFields);
  const result = await academicFacultyService.getAllFaculty(
    filterProperties,
    paginationProperties
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully getting all faculties',
    data: result.data,
    meta: result.meta,
  });
});

const getASingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicFacultyService.getASingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully retrieved this faculty',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await academicFacultyService.updateFaculty(id, updatedData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully updated faculty',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicFacultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully deleted faculty',
    data: result,
  });
});

export const academicFacultyController = {
  createFaculty,
  getAllFaculties,
  getASingleFaculty,
  updateFaculty,
  deleteFaculty,
};
