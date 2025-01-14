import { Request, Response, NextFunction } from "express";
import type { IUser } from "../models/user";

/**
 * Checks if the currently logged in user is an admin.
 *
 * If the user is not an admin, a 403 response is sent with a message of "Not authorized".
 * If the user is an admin, the request is passed to the next middleware.
 */

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as IUser;

  if (!user || user.role !== "admin") {
    res.status(403).json({ message: "Not authorized" });
    return;
  }

  next();
};
