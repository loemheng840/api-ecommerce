import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
}


const generateToken = (userId: string): string => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN } as jwt.SignOptions
  );
};

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, error: "Invalid token" });
  }
};

export { generateToken, verifyToken };
