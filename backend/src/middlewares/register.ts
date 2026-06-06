import { Request, Response, NextFunction } from "express";
import { RegisterRequestBody } from "../types";

export async function validateRegisterRequest(
  req: Request<{}, any, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
) {
  {
    const { username, password, firstName, lastName } = req.body;

    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'username'" });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'password'" });
    }

    if (!firstName || typeof firstName !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'firstName'" });
    }

    if (!lastName || typeof lastName !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'lastName'" });
    }
  }
  next();
}
