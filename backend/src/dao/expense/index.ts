import { Expense } from "../../models";
import {
  createExpenseRequestBody,
  updateExpenseRequestBody,
} from "../../types";

export interface ExpenseDao {
  create(expense: createExpenseRequestBody, userId: number): Promise<Expense>;
  findById(id: number, userId: number): Promise<Expense | undefined>;
  findAll(userId: number): Promise<Expense[]>;
  updateById(
    id: number,
    expense: updateExpenseRequestBody,
    userId: number,
  ): Promise<Expense>;
  deleteById(id: number, userId: number): Promise<void>;
}

export * from "./postgresExpenseDao";
