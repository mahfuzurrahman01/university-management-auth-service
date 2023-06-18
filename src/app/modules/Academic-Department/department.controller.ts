import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import {
  IAcademicDepartment,
  departmentFilterableFields,
} from './department.interface';
import { departmentService } from './department.service';
import status from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departMentData } = req.body;
  const result = await departmentService.createDepartment(departMentData);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filterProperties = pick(req.query, departmentFilterableFields);
  const paginationProperties = pick(req.query, paginationFields);
  const result = await departmentService.getAllDepartment(
    filterProperties,
    paginationProperties
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: status.OK,
    success: true,
    message: 'Successfully getting all Departments',
    data: result.data,
    meta: result.meta,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await departmentService.updateDepartment(id, updatedData);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Successfully updated Department',
      data: result,
    });
  });

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await departmentService.getASingleDepartment(id);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Successfully retrieved this department',
      data: result,
    });
  });

  const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await departmentService.deleteDepartment(id);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: status.OK,
      success: true,
      message: 'Successfully deleted department',
      data: result,
    });
  });

export const AcademicDepartmentController = {
  createDepartment,
  getAllFaculties,
  updateDepartment,
  getSingleDepartment,
  deleteDepartment
};
