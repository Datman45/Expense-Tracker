import { IDomain } from "./IDomain";

export interface IExpense extends IDomain {
  category: string;
  amount: number;
  currency: string;
  description: string;
  transactionType: "income" | "expense";
  recordedAt: string;
}
