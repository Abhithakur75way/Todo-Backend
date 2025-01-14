"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task-controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
const role_middleware_1 = require("../middleware/role-middleware");
const router = (0, express_1.Router)();
const taskController = new task_controller_1.TaskController();
// Routes for admin to create a task
// The user must be authenticated, and the role must be admin
router.post("/tasks", auth_middleware_1.authenticate, role_middleware_1.isAdmin, taskController.createTask);
// Routes for users to view assigned tasks
// Only authentication is required, no role check is necessary
router.get("/tasks", auth_middleware_1.authenticate, taskController.getUserTasks);
exports.default = router;
