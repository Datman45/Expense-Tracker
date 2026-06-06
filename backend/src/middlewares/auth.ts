import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).send("Authentication required");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token required");
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).send("JWT_SECRET is not configured");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    (req as any).user = payload;

    return next();
  } catch (error) {
    return res.status(401).send({
      error: "Invalid token",
    });
  }
}
