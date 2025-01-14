"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    const user = req.user;
    if (!user || user.role !== "admin") {
        res.status(403).json({ message: "Not authorized" });
        return; // Ensure no further execution
    }
    next(); // Pass control to the next middleware
};
exports.isAdmin = isAdmin;
