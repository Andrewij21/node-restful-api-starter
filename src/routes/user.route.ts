// src/routes/todo.routes.ts
import { Router } from "express";
import { requireAuth } from "@/middlewares/auth";
import { UserController } from "@/controllers/user.controller";
import { catchAsync } from "@/utils/catchAsync";
import { requireRole } from "@/middlewares/roles";
import { ROLES } from "@/constants/roles";

const router = Router();
const userController = new UserController();

// protect all todo routes
router.use(requireAuth);

router.get("/", requireRole(ROLES.ADMIN), catchAsync(userController.getUsers));
router.get("/:id", catchAsync(userController.getUser));
router.post("/", catchAsync(userController.createUser));
router.patch("/:id", catchAsync(userController.updateUser));
router.delete("/:id", catchAsync(userController.deleteUser));

export default router;
