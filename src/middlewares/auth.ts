import { env } from "@/config/env";
import { UnauthorizedError } from "@/utils/customeErrors";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("No token provided or invalid format");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as Express.UserPayload;
    req.user = decoded; // ✅ now properly typed
    return next();
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }
}
