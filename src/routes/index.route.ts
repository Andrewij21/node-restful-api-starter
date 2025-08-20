import { Router } from "express";
import userRoutes from "@/routes/user.route";
import authRoutes from "@/routes/auth.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
