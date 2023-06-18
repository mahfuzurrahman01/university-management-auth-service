import { z } from 'zod';

const zodAcademicFacultySchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
const zodAcademicFacultyUpdateSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});

export const facultyValidation = {
  zodAcademicFacultySchema,
  zodAcademicFacultyUpdateSchema
};
