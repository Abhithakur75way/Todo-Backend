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
exports.UserController = void 0;
const user_services_1 = __importDefault(require("../services/user-services"));
const jwt_utils_1 = __importDefault(require("../utils/jwt-utils"));
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = req.body;
            try {
                const user = yield user_services_1.default.signUp({
                    username,
                    email,
                    password,
                    role,
                });
                const token = jwt_utils_1.default.generateToken(user);
                res.status(201).json({ token });
            }
            catch (error) {
                // Type assertion to ensure error is of type Error
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    // Generic error handling when error is not an instance of Error
                    res.status(400).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield user_services_1.default.signIn(email, password);
                const token = jwt_utils_1.default.generateToken(user);
                res.json({ token });
            }
            catch (error) {
                // Type assertion to ensure error is of type Error
                if (error instanceof Error) {
                    res.status(400).json({ message: error.message });
                }
                else {
                    // Generic error handling when error is not an instance of Error
                    res.status(400).json({ message: "An unknown error occurred" });
                }
            }
        });
    }
}
exports.UserController = UserController;
