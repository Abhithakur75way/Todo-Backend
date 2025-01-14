"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./src/routes/user-routes"));
const task_routes_1 = __importDefault(require("./src/routes/task-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB", error));
app.use("/api", user_routes_1.default);
app.use("/api", task_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
