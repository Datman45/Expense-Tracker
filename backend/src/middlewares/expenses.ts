import { Request, Response, NextFunction } from "express";
import { createExpenseRequestBody, updateExpenseRequestBody } from "../types";

export function validateCreateExpensesRequest(
  req: Request<{}, any, createExpenseRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const {
    category,
    amount,
    currency,
    description,
    transactionType,
    recordedAt,
  } = req.body;

  if (!category || typeof category !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'expenseType'" });
  }

  if (amount === undefined || typeof amount !== "number") {
    return res.status(400).json({ error: "Invalid or missing 'moneyAmount'" });
  }

  if (!currency || typeof currency !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'currency'" });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'description'" });
  }

  if (
    !transactionType ||
    (transactionType !== "income" && transactionType !== "expense")
  ) {
    return res
      .status(400)
      .json({ error: "Invalid or missing 'transactionType'" });
  }

  if (
    !recordedAt ||
    typeof recordedAt !== "string" ||
    isNaN(Date.parse(recordedAt))
  ) {
    return res.status(400).json({ error: "Invalid or missing 'recordedAt'" });
  }

  next();
}

export function validateUpdateExpensesRequest(
  req: Request<{}, any, updateExpenseRequestBody>,
  res: Response,
  next: NextFunction,
) {
  const {
    category,
    amount,
    currency,
    description,
    transactionType,
    recordedAt,
  } = req.body;

  if (category !== undefined && typeof category !== "string") {
    return res.status(400).json({ error: "Invalid 'category'" });
  }

  if (amount !== undefined && typeof amount !== "number") {
    return res.status(400).json({ error: "Invalid 'amount'" });
  }

  if (currency !== undefined && typeof currency !== "string") {
    return res.status(400).json({ error: "Invalid 'currency'" });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ error: "Invalid 'description'" });
  }

  if (
    transactionType !== undefined &&
    transactionType !== "income" &&
    transactionType !== "expense"
  ) {
    return res.status(400).json({ error: "Invalid 'transactionType'" });
  }

  if (
    recordedAt !== undefined &&
    (typeof recordedAt !== "string" || isNaN(Date.parse(recordedAt)))
  ) {
    return res.status(400).json({ error: "Invalid 'recordedAt'" });
  }

  next();
}
