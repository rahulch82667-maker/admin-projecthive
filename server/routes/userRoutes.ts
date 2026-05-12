import express from "express";
import { getAllUsers, updateUserRole, toggleUserBlock } from "../controllers/userController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// All routes here require authentication and admin role
router.use(protect);
router.use(admin);

router.get("/", getAllUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/block", toggleUserBlock);

export default router;
