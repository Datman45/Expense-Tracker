import { ExpenseDao } from "../dao";
import { NotFoundError } from "../error";
import { Expense } from "../models";
import {
  createExpenseRequestBody,
  ExpenseResponseDto,
  updateExpenseRequestBody,
} from "../types";

export class ExpenseController {
  constructor(private expenseDao: ExpenseDao) {}

  async getAllExpenses(userId: number) {
    {
      return await this.expenseDao.findAll(userId);
    }
  }

  async createExpense(expenseData: createExpenseRequestBody, userId: number) {
    const newExpense = await this.expenseDao.create(expenseData, userId);
    return newExpense;
  }

  async getExpenseById(id: number, userId: number) {
    return await this.getExpenseOrThrowErrorById(id, userId);
  }

  async deleteExpenseById(id: number, userId: number) {
    await this.getExpenseOrThrowErrorById(id, userId);
    await this.expenseDao.deleteById(id, userId);
  }

  async updateExpenseById(
    id: number,
    expenseData: updateExpenseRequestBody,
    userId: number,
  ) {
    await this.getExpenseOrThrowErrorById(id, userId);
    const updatedExpense = await this.expenseDao.updateById(
      id,
      expenseData,
      userId,
    );
    return updatedExpense;
  }

  private async getExpenseOrThrowErrorById(
    id: number,
    userId: number,
  ): Promise<Expense> {
    const result = await this.expenseDao.findById(id, userId);

    if (!result) {
      throw new NotFoundError(`Expense with id ${id} not found`);
    }

    return result;
  }
}
