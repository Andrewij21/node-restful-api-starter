// src/services/todo.service.ts
import { env } from "@/config/env";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { type LoginSchema, type RegisterSchema } from "@/schemas/auth.schema";
import { NotFoundError, UnauthorizedError } from "@/utils/customeErrors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class AuthService {
  async login(credentials: LoginSchema) {
    const { email, password } = credentials;
    logger.info({ email, password });
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) throw new UnauthorizedError("Invalid Credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Credentials");

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      env.JWT_SECRET
    );
    return { token };
  }

  async register(credentials: RegisterSchema) {
    const { email, password, contact } = credentials;
    const user = await prisma.user.findFirst({ where: { email } });
    if (user) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, contact },
    });

    return newUser;
  }
}

// Export a singleton (best in Node, no need `new` every time)
export const authService = new AuthService();
