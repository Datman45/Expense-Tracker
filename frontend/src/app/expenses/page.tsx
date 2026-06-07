"use client";

import { ExpensesService } from "@/services/ExpensesService";
import { useContext, useEffect, useState } from "react";
import { IExpense } from "@/types/domain/IExpense";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccountContext } from "@/contex/AccountContex";

export default function Expenses() {
  const expensesService = new ExpensesService();
  const [data, setData] = useState<IExpense[]>([]);
  const [errors, setErrorMessage] = useState<string[]>([]);
  const { accountInfo } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    if (!accountInfo?.token) {
      router.push("/");
    }
  }, [accountInfo, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await expensesService.getAllAsync(accountInfo);
        if (result.errors) {
          return;
        }

        setData(result.data ?? []);
      } catch (error) {
        setErrorMessage([(error as Error).message]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="text-centered-content">
        <h1>Expenses Page</h1>
        <p>Here you can view and manage your expenses.</p>
        <div className="add-button mb-3">
          <Link className="btn btn-primary mb-9" href="/expenses/create">
            Add New Expense
          </Link>
        </div>
      </div>

      <div className="expenseTable">
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>Description</th>
              <th>Transaction Type</th>
              <th>Recorded At</th>
              <th className="text-centered-content">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.category}</td>
                <td>{expense.amount}</td>
                <td>{expense.currency}</td>
                <td>{expense.description}</td>
                <td>{expense.transactionType}</td>
                <td>{expense.recordedAt}</td>
                <td className="actions-buttons">
                  <Link
                    className="btn btn-secondary"
                    href={`/expenses/view/${expense.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-success"
                    href={`/expenses/edit/${expense.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger"
                    href={`/expenses/delete/${expense.id}`}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
