import { Schema, model } from 'mongoose';
import { IAcademic, academicSemesterModel } from './academic.interface';
import {
  academicSemesterCode,
  academicSemesterMonths,
  academicSemesterTitle,
} from './academic.constant';

export const academicSemesterSchema = new Schema<IAcademic>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: Number,
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

export const academicSemester = model<IAcademic, academicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
