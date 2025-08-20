import { Response } from "express";
import { success } from "zod";

interface ApiResponse<T> {
  message?: string;
  data?: T;
  count?: number;
}

export const sendApiResponse = <T>(
  res: Response,
  statusCode: number,
  apiResponse: ApiResponse<T>
): void => {
  res.status(statusCode).json({ success: true, ...apiResponse });
};
