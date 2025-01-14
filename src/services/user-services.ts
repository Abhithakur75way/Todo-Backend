import bcrypt from "bcryptjs";
import User from "../models/user";
import { IUser } from "../models/user";

class UserService {
  // Sign Up
  async signUp({ username, email, password, role }: Partial<IUser>) {
    const hashedPassword = await bcrypt.hash(password!, 10);
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    return user;
  }

  // Sign In
  async signIn(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials!");

    return user;
  }
}

export default new UserService();
