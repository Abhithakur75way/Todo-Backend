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
const tasks_1 = __importDefault(require("../models/tasks"));
class TaskService {
    // Create Task
    createTask(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, description, assignedTo, createdBy, }) {
            const task = new tasks_1.default({
                title,
                description,
                assignedTo,
                createdBy,
            });
            yield task.save();
            return task;
        });
    }
    // Get Tasks by User
    getTasksByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return tasks_1.default.find({ assignedTo: userId });
        });
    }
}
exports.default = new TaskService();
