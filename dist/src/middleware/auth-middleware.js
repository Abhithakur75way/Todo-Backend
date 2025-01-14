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
exports.authenticate = void 0;
const jwt_utils_1 = __importDefault(require("../utils/jwt-utils"));
// Make the middleware async, and return void or Promise<void>
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Get the token from Authorization header
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        // Send a 403 response if no token is provided
        res.status(403).json({ message: "No token provided" });
        return; // Return here to stop further execution
    }
    try {
        // Verify the token (assuming verifyToken is an async function returning the decoded user)
        const user = yield jwt_utils_1.default.verifyToken(token);
        if (!user) {
            // Send a 401 response if the token is invalid
            res.status(401).json({ message: "Invalid token" });
            return; // Return here to stop further execution
        }
        // Attach the user object to the request for use in other middleware or routes
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    }
    catch (error) {
        // Handle any error during the token verification process
        res.status(401).json({ message: "Invalid token" });
    }
});
exports.authenticate = authenticate;
