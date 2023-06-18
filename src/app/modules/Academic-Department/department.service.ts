import { SortOrder } from 'mongoose';
import {
  IAcademicDepartment,
  IDepartmentalFilterFields,
  departmentFilterableFields,
} from './department.interface';
import { AcademicDepartment } from './department.model';
import { calculation } from '../../../helpers/paginationHelpers';
import { IPagination } from '../../../interfaces/pagination.interface';

const createDepartment = async (payload: IAcademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};
const getAllDepartment = async (
  filterProperties: IDepartmentalFilterFields,
  paginationOptions: IPagination
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculation.paginationCalculation(paginationOptions);
  const andConditions = [];
  const { searchTerm, ...filtersData } = filterProperties;
  if (searchTerm) {
    andConditions.push({
      $or: departmentFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateDepartment = async (
  id: string,
  updatedData: IAcademicDepartment
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};
const getASingleDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const deleteDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const departmentService = {
  createDepartment,
  getAllDepartment,
  updateDepartment,
  getASingleDepartment,
  deleteDepartment,
};
