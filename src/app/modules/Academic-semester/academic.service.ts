import ApiError from '../../../errors/apiErrors';
import status from 'http-status';
import { academicSemesterTitleCodeMapper } from './academic.constant';
import { IAcademic, IFilterProperties } from './academic.interface';
import { academicSemester } from './acedemic.model';
import { IPagination } from '../../../interfaces/pagination.interface';
import { calculation } from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';
import { searchableFields } from '../../../constants/searchable';

type IGenericResult<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

const createSemester = async (payload: IAcademic): Promise<IAcademic> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await academicSemester.create(payload);
  return result;
};

const getSemesters = async (
  filterProperties: IFilterProperties,
  paginationProperties: IPagination
): Promise<IGenericResult<IAcademic[]>> => {
  // getting values for filter
  const andCondition = [];
  const { searchTerm } = filterProperties;

  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // filtered data exact match response
  if (Object.keys(filterProperties).length) {
    andCondition.push({
      $and: Object.entries(filterProperties).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i'
  //         }
  //       }
  //     ],
  //   },
  // ];

  // getting values for pagination
  const { page, skip, limit, sortBy, sortOrder } =
    calculation.paginationCalculation(paginationProperties);
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // ***************** Result ********************
  const result = await academicSemester
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await academicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// ************ single semester with id **********
const getSemesterWithId = async (id: string) => {
  const result = await academicSemester.findById(id);
  return result;
};

const updateSemester = async (id: string, payload: Partial<IAcademic>) => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await academicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemester = async (id: string): Promise<IAcademic | null> => {
  const result = await academicSemester.findByIdAndDelete(id);
  return result;
};

export const academicSemesterService = {
  getSemesterWithId,
  createSemester,
  getSemesters,
  updateSemester,
  deleteSemester,
};
