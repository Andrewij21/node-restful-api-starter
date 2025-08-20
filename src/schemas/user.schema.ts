// src/schemas/todo.ts
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email(),
  password: z.string().optional(),
  contact: z.string().min(1),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  contact: z.string().min(1).optional(),
  role: z.string().optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
