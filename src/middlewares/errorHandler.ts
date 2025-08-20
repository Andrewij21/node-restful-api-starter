// middlewares/errorHandler.ts
import { logger } from "@/lib/logger";
import { ApiError } from "@/utils/customeErrors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const handleResponse = (err: any, req: Request, res: Response) => {
  if (err instanceof ZodError) {
    logger.warn({ message: "validation error", issues: err.issues });
    const formatedErrors = err.issues.map((issue) => {
      return {
        path: issue.path.join(","),
        message: issue.message,
      };
    });
    return res.status(400).json({
      success: false,
      message: "validation failed",
      error: formatedErrors,
    });
  }

  // Handle Prisma-specific errors
  if (err instanceof PrismaClientKnownRequestError) {
    // P2025: Record not found
    if (err.code === "P2002") {
      const field = err.meta?.target;
      return res.status(409).json({
        success: false,
        message: `The provided ${field} is already in use.`,
      });
    }

    // P2025: Record not found
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }
    // Handle other Prisma errors as needed
  }

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  logger.error({
    status: err.status || 500,
    message: err.message,
  });
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });

  // Do not expose stack trace in production
  if (process.env.NODE_ENV === "production") {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  } else {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: err.stack,
    });
  }
};

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  handleResponse(err, req, res);
}
