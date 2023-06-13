import { z } from 'zod';

const zodCreateUserSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({ required_error: 'Role is required' }),
      password: z.string().optional(),
    }),
  }),
});

export const userValidation = {
  zodCreateUserSchema,
};
