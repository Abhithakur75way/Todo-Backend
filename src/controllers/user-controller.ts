import { Request, Response } from "express";
import UserService from "../services/user-services";
import jwtUtils from "../utils/jwt-utils";

export class UserController {
  /**
   * Handles user registration by creating a new user and returning a JWT token.
   *
   * @param req - The Express request object, containing the user's registration details in the body.
   * @param res - The Express response object, used to send back the JWT token or an error message.
   */

  /**
   * Handles user registration by creating a new user and returning a JWT token.
   *
   * If the registration is successful, a 201 response is sent with the JWT token in the body.
   * If the registration fails, a 400 response is sent with an error message in the body.
   *
   * @param req - The Express request object, containing the user's registration details in the body.
   * @param res - The Express response object, used to send back the JWT token or an error message.
   */
  async signUp(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    try {
      const user = await UserService.signUp({
        username,
        email,
        password,
        role,
      });
      const token = jwtUtils.generateToken(user);
      res.status(201).json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }

  /**
   * Handles user login by verifying the user's credentials and returning a JWT token.
   *
   * @param req - The Express request object, containing the user's login details in the body.
   * @param res - The Express response object, used to send back the JWT token or an error message.
   */
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await UserService.signIn(email, password);
      const token = jwtUtils.generateToken(user);
      res.json({ token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  }
}
