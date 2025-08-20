// src/middlewares/roles.ts
import { ForbiddenError } from "@/utils/customeErrors";
import { Request, Response, NextFunction } from "express";

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError(
        "You do not have permission to access this route."
      );
    }
    next();
  };
}
