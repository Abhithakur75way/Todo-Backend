import Task, { ITask } from "../models/tasks";
import mongoose from "mongoose";

class TaskService {
  async createTask({
    title,
    description,
    assignedTo,
    createdBy,
  }: {
    title: string;
    description: string;
    assignedTo: mongoose.Schema.Types.ObjectId;
    createdBy: mongoose.Schema.Types.ObjectId | null;
  }): Promise<ITask> {
    const task = new Task({
      title,
      description,
      assignedTo,
      createdBy,
    });
    await task.save();
    return task;
  }

  async getTasksByUser(userId: string) {
    return Task.find({ assignedTo: userId });
  }
}

export default new TaskService();
