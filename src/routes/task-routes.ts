import { Router } from "express";
import { TaskController } from "../controllers/task-controller";
import { authenticate } from "../middleware/auth-middleware";
import { isAdmin } from "../middleware/role-middleware";

const router = Router();
const taskController = new TaskController();

// Routes for admin to create a task
// The user must be authenticated, and the role must be admin
router.post("/tasks", authenticate, isAdmin, taskController.createTask);

// Routes for users to view assigned tasks
// Only authentication is required, no role check is necessary
router.get("/tasks", authenticate, taskController.getUserTasks);

export default router;
