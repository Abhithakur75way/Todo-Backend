"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const task_services_1 = __importDefault(require("../services/task-services"));
class TaskController {
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, assignedTo } = req.body;
            const user = req.user;
            try {
                if (!user || user.role !== "admin") {
                    res.status(403).json({ message: "Not authorized to create task" });
                    return;
                }
                // Ensure createdBy is of type mongoose.Schema.Types.ObjectId
                const createdBy = user._id instanceof mongoose_1.default.Schema.Types.ObjectId ? user._id : null;
                const task = yield task_services_1.default.createTask({
                    title,
                    description,
                    assignedTo,
                    createdBy,
                });
                res.status(201).json(task);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "An unknown error occurred";
                res.status(400).json({ message });
            }
        });
    }
    getUserTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                if (!user || !("role" in user)) {
                    res.status(403).json({ message: "Not authorized to view tasks" });
                    return;
                }
                const tasks = yield task_services_1.default.getTasksByUser(user._id);
                res.json(tasks);
            }
            catch (error) {
                const message = error instanceof Error ? error.message : "An unknown error occurred";
                res.status(400).json({ message });
            }
        });
    }
}
exports.TaskController = TaskController;
