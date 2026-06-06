import { components } from "../schemas";

export type ExpenseResponseDto = components["schemas"]["expense"];

export type CreateExpenseResponseBody = components["schemas"]["expenseCreate"];

export type UpdateExpenseResponseBody = components["schemas"]["expenseUpdate"];

export interface createExpenseRequestBody {
  category: string;
  amount: number;
  currency: string;
  description: string;
  transactionType: "income" | "expense";
  recordedAt: string;
}

export interface updateExpenseRequestBody {
  category?: string;
  amount?: number;
  currency?: string;
  description?: string;
  transactionType?: "income" | "expense";
  recordedAt?: string;
}
