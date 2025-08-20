import { Request, Response } from "express";
import { userService } from "@/services/user.service";
import { createUserSchema, updateUserSchema } from "@/schemas/user.schema";
import { sendApiResponse } from "@/utils/sendApiResponse";
import { logger } from "@/lib/logger";

export class UserController {
  getUsers = async (req: Request, res: Response) => {
    const { page, limit, q, role } = req.query;
    const params = {
      page: Number(page) ? parseInt(page as string) : 1,
      limit: Number(limit) ? parseInt(limit as string) : 10,
      q: q as string,
      role: role as string,
    };
    const { user, count } = await userService.getAll(params);
    sendApiResponse(res, 200, {
      message: "User fetched successfully",
      count: count,
      data: user,
    });
  };

  getUser = async (req: Request, res: Response) => {
    const User = await userService.getById(req.params.id);
    if (!User)
      return res.status(404).json({ success: false, error: "User not found" });

    sendApiResponse(res, 200, {
      message: "User fetched successfully",
      data: User,
    });
  };

  createUser = async (req: Request, res: Response) => {
    const parsed = createUserSchema.parse(req.body);

    const user = await userService.create(parsed);

    sendApiResponse(res, 201, {
      message: "User created successfully",
      data: user,
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const parsed = updateUserSchema.parse(req.body);

    const updated = await userService.update(req.params.id, parsed);
    logger.info({ updated });
    sendApiResponse(res, 200, {
      message: "User updated successfully",
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const deleted = await userService.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, error: "user not found" });

    sendApiResponse(res, 200, {
      message: "User deleted successfully",
    });
  };
}

// Export instance
export const userController = new UserController();
