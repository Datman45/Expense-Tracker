export class Expense {
  constructor(
    public id: number,
    public category: string,
    public amount: number,
    public currency: string,
    public description: string,
    public transactionType: "income" | "expense",
    public recordedAt: string,
  ) {}
}
