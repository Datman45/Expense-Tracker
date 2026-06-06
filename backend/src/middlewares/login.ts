import { Request, Response, NextFunction } from "express";
import { LoginRequestBody } from "../types";

export function validateLoginRequest(
  req: Request<{}, any, LoginRequestBody>,
  res: Response,
  next: NextFunction,
) {
  {
    const { username, password } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'username'" });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'password'" });
    }
  }

  next();
}
