import { z } from 'zod';
import { role } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string(),
    id: z.string(),

    lastName: z.string(),
    role: z.enum([...role] as [string, ...string[]]),
    isBanned: z.boolean(),
    email: z.string().email(),
    phoneNumber: z.string(),
    address: z.string(),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    isBanned: z.boolean().optional(),
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const UserValidaion = {
  updateUserZodSchema,
  createUserZodSchema,
};
