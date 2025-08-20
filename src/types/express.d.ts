// src/types/express.d.ts
import { User } from "@prisma/client"; // assuming Prisma generates this

declare global {
  namespace Express {
    interface UserPayload {
      id: string;
      email: string;
      role: User["role"]; // or just "ADMIN" | "USER" if you want
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
