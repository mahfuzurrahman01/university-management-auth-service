import { SortOrder } from 'mongoose';
import { calculation } from '../../../helpers/paginationHelpers';
import { IPagination } from '../../../interfaces/pagination.interface';
import { academicFacultyFilterableFields } from './faculty.constant';
import { IAcademicFaculty, IAcademicFacultyFilters } from './faculty.interface';
import { AcademicFaculty } from './faculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculty = async (
  filterProperties: IAcademicFacultyFilters,
  paginationOptions: IPagination
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculation.paginationCalculation(paginationOptions);
  const andConditions = [];
  const { searchTerm, ...filtersData } = filterProperties;
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultyFilterableFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getASingleFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFaculty = async (id: string, updatedData: IAcademicFaculty) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const academicFacultyService = {
  createFaculty,
  getAllFaculty,
  getASingleFaculty,
  updateFaculty,
  deleteFaculty,
};
