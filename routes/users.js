// routes/users.js
import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { validateBody } from "../middleware/userValidator.js";
import { authorize } from "../middleware/authzMiddleware.js";

const router = express.Router();

router.get("/", authorize("viewer"), getAllUsers);
router.get("/:id", authorize("viewer"), getUserById);
router.post("/", authorize("writer"), validateBody, createUser);
router.put("/:id", authorize("writer"), validateBody, updateUser);
router.delete("/:id", authorize("writer"), deleteUser);

export default router;
