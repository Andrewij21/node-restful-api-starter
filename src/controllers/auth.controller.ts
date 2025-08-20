import { Request, Response } from "express";
import { loginSchema, registerSchema } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { success } from "zod";

export class AuthController {
  login = async (req: Request, res: Response) => {
    const parsed = loginSchema.parse(req.body);

    const user = await authService.login(parsed);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: user.token,
      },
    });
  };
  register = async (req: Request, res: Response) => {
    const parsed = registerSchema.parse(req.body);
    const user = await authService.register(parsed);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        email: user.email,
        id: user.id,
        role: user.role,
      },
    });
  };
}

// Export instance
export const authController = new AuthController();
