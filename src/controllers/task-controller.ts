import { Request, Response } from "express";
import mongoose from "mongoose";
import TaskService from "../services/task-services";
import { IUser } from "../models/user";

export class TaskController {
  /**
   * Creates a new task. The user must be authenticated and have the role of admin.
   * @param req - The Express request object.
   * @param res - The Express response object.
   */
  async createTask(req: Request, res: Response): Promise<void> {
    const { title, description, assignedTo } = req.body;
    const user = req.user as IUser | undefined;

    try {
      if (!user || user.role !== "admin") {
        res.status(403).json({ message: "Not authorized to create task" });
        return;
      }

      const createdBy: mongoose.Schema.Types.ObjectId | null =
        user._id instanceof mongoose.Schema.Types.ObjectId ? user._id : null;

      const task = await TaskService.createTask({
        title,
        description,
        assignedTo,
        createdBy,
      });

      res.status(201).json(task);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ message });
    }
  }

  /**
   * Returns a list of tasks assigned to the currently logged-in user.
   *
   * Only authenticated users can call this endpoint.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   */
  async getUserTasks(req: Request, res: Response): Promise<void> {
    const user = req.user as IUser | undefined;

    try {
      if (!user || !("role" in user)) {
        res.status(403).json({ message: "Not authorized to view tasks" });
        return;
      }

      const tasks = await TaskService.getTasksByUser(user._id as string);
      res.json(tasks);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ message });
    }
  }
}
