import { pool } from "../../db/connection";
import { ExpenseDao } from ".";
import { Expense } from "../../models";
import {
  createExpenseRequestBody,
  updateExpenseRequestBody,
} from "../../types";

export class PostgresExpenseDao implements ExpenseDao {
  async create(
    expense: createExpenseRequestBody,
    userId: number,
  ): Promise<Expense> {
    const result = await pool.query(
      "INSERT INTO expenses (user_id, category, amount, currency, description, transaction_type, recorded_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        userId,
        expense.category,
        expense.amount,
        expense.currency,
        expense.description,
        expense.transactionType,
        expense.recordedAt,
      ],
    );

    return this.toExpense(result.rows[0]);
  }

  async findById(id: number, userId: number): Promise<Expense | undefined> {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE id = $1 and user_id = $2",
      [id, userId],
    );

    if (result.rows.length === 0) {
      return undefined;
    }

    return this.toExpense(result.rows[0]);
  }

  async findAll(userId: number): Promise<Expense[]> {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE user_id = $1",
      [userId],
    );

    return result.rows.map((row) => {
      return this.toExpense(row);
    });
  }

  async updateById(
    id: number,
    expense: updateExpenseRequestBody,
    userId: number,
  ): Promise<Expense> {
    const existingExpense = await this.findById(id, userId);

    if (!existingExpense) {
      throw new Error(`Expense with id ${id} not found`);
    }

    const updatedExpense = new Expense(
      id,
      expense.category ?? existingExpense.category,
      expense.amount ?? existingExpense.amount,
      expense.currency ?? existingExpense.currency,
      expense.description ?? existingExpense.description,
      expense.transactionType ?? existingExpense.transactionType,
      expense.recordedAt ?? existingExpense.recordedAt,
    );

    const result = await pool.query(
      "UPDATE expenses SET category = $1, amount = $2, currency = $3, description = $4, transaction_type = $5, recorded_at = $6 WHERE id = $7 and user_id = $8 RETURNING *",
      [
        updatedExpense.category,
        updatedExpense.amount,
        updatedExpense.currency,
        updatedExpense.description,
        updatedExpense.transactionType,
        updatedExpense.recordedAt,
        id,
        userId,
      ],
    );

    return this.toExpense(result.rows[0]);
  }

  async deleteById(id: number, userId: number): Promise<void> {
    await pool.query("DELETE FROM expenses WHERE id = $1 and user_id = $2", [
      id,
      userId,
    ]);
  }

  private toExpense(row: any): Expense {
    return new Expense(
      row.id,
      row.category,
      Number(row.amount),
      row.currency,
      row.description,
      row.transaction_type,
      row.recorded_at,
    );
  }
}
