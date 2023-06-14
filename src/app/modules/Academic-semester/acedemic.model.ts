import { Schema, model } from 'mongoose';
import { IAcademic, academicSemesterModel } from './academic.interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academic.constant';
import ApiError from '../../../errors/apiErrors';
import status from 'http-status';

export const academicSemesterSchema = new Schema<IAcademic>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExists = await academicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExists) {
    throw new ApiError(status.CONFLICT, 'This semester is already exists!');
  }
  next();
});

export const academicSemester = model<IAcademic, academicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
