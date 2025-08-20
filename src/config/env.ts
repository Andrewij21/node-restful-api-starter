import * as dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

export const env = z
  .object({
    DATABASE_URL: z.string().optional(),
    JWT_SECRET: z.string().min(10),
    PORT: z.coerce.number().optional(),
  })
  .parse(process.env);
