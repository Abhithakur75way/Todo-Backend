import jwt from "jsonwebtoken";

const generateToken = (user: any) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
};

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
};

export default { generateToken, verifyToken };
