// src/routes/todo.routes.ts
import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { catchAsync } from "@/utils/catchAsync";

const router = Router();
const authController = new AuthController();

router.post("/login", catchAsync(authController.login));
router.post("/register", catchAsync(authController.register));

export default router;
