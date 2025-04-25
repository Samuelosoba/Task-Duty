import express from "express";
import { createTask, getTasks, deleteTask,editTask } from "../controller/task.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();
router.post("/create", authMiddleware, createTask);
router.get("/get", authMiddleware, getTasks);
router.delete("/delete/:id", authMiddleware, deleteTask);
router.patch("/edit/:id", authMiddleware, editTask);
export default router;
