// src/schemas/todo.ts
import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  contact: z.string().min(1),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
