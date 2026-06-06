"use client";

import { ExpensesService } from "@/services/ExpensesService";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AccountContext } from "@/contex/AccountContex";

export default function CreateExpense() {
  const router = useRouter();
  const [error, setErrorMessage] = useState("");
  const expenseService = new ExpensesService();
  const { accountInfo } = useContext(AccountContext);

  useEffect(() => {
    if (!accountInfo?.token) {
      router.push("/");
    }
  }, [accountInfo, router]);

  type inputs = {
    category: string;
    amount: number;
    currency: string;
    description: string;
    transactionType: "income" | "expense";
    recordedAt: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({
    defaultValues: { category: "", amount: 0, currency: "", description: "" },
  });

  const onSubmit: SubmitHandler<inputs> = async (data: inputs) => {
    const inputData = {
      category: data.category,
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      transactionType: data.transactionType,
      recordedAt: new Date().toISOString().split("T")[0],
    };

    try {
      const result = await expenseService.createAsync(inputData, accountInfo);

      if (result.errors) {
        return;
      }

      router.push("/expenses");
    } catch (error) {
      setErrorMessage("Create expense failed - " + (error as Error).message);
    }
  };

  return (
    <>
      <div className="text-centered-content">
        <h1>Create Expense Page</h1>
        <p>Here you can create a new expense.</p>
        <div className="text-danger mb-2">{error}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="inputCategory">Category</label>
          <input
            type="text"
            className="form-control"
            id="inputCategory"
            placeholder="Enter category name"
            {...register("category", {
              required: "Category is required",
            })}
          />
          {errors.category && (
            <span className="text-danger field-validation-valid">
              {errors.category.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputAmount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="inputAmount"
            placeholder="Amount of money"
            {...register("amount", {
              required: "Amount is required",
              valueAsNumber: true,
              min: {
                value: 0.01,
                message: "Amount must be greater than 0",
              },
            })}
          />
          {errors.amount && (
            <span className="text-danger field-validation-valid">
              {errors.amount.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputCurrency">Currency</label>
          <input
            type="text"
            className="form-control"
            id="inputCurrency"
            placeholder="Enter currency"
            {...register("currency", {
              required: "Currency is required",
            })}
          />
          {errors.currency && (
            <span className="text-danger field-validation-valid">
              {errors.currency.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="inputDescription">Description</label>
          <textarea
            className="form-control"
            id="inputDescription"
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-danger field-validation-valid">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="expenseType"
              value="expense"
              {...register("transactionType", {
                required: "Transaction type is required",
              })}
            />
            <label className="form-check-label" htmlFor="expenseType">
              Expense
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              id="incomeType"
              value="income"
              {...register("transactionType", {
                required: "Transaction type is required",
              })}
            />
            <label className="form-check-label" htmlFor="incomeType">
              Income
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
