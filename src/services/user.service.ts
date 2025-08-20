// src/services/todo.service.ts
import { prisma } from "@/lib/prisma";
import type { CreateUserSchema, UpdateUserSchema } from "@/schemas/user.schema";
import { NotFoundError } from "@/utils/customeErrors";
class UserService {
  async getAll(params: {
    page?: number;
    limit?: number;
    q?: string;
    role?: string;
  }) {
    const { page = 1, limit = 10, role, q } = params;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (role) where.role = role;
    if (q) {
      where.OR = [
        { email: { contains: q, mode: "insensitive" } },
        { contact: { contains: q, mode: "insensitive" } },
      ];
    }
    const [user, count] = await prisma.$transaction([
      prisma.user.findMany({ where, skip, take: limit }),
      prisma.user.count({ where }),
    ]);
    return { user, count };
  }

  async getById(id: string) {
    const user = await prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async create(data: CreateUserSchema) {
    return prisma.user.create({ data: { ...data } });
  }

  async update(id: string, data: UpdateUserSchema) {
    const { password, ...userData } = data;
    return prisma.user.update({ where: { id }, data: userData });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}

// Export a singleton (best in Node, no need `new` every time)
export const userService = new UserService();
