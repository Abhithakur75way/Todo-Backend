import { Request, Response, NextFunction } from "express";
import jwtUtils from "../utils/jwt-utils";

/**
 * Middleware to authenticate a user with a JWT token.
 *
 * If the token is valid, the user object is attached to the request.
 * If the token is invalid, a 401 response is sent.
 * If no token is provided, a 403 response is sent.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A Promise that resolves when the middleware has finished executing.
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  try {
    const user = await jwtUtils.verifyToken(token);

    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
