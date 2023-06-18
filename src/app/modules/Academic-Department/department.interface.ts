import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../Academic-faculty/faculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;
export type IDepartmentalFilterFields = {
  searchTerm?: string;
  title?: string;
};

export const departmentFilterableFields = ['searchTerm', 'title'];
