"use client";

import { ExpensesService } from "@/services/ExpensesService";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { AccountContext } from "@/contex/AccountContex";

export default function EditExpense() {
  const params = useParams();
  const idParam = Number(params.id);
  const [error, setErrorMessage] = useState<string[]>();
  const expenseService = new ExpensesService();
  const router = useRouter();
  const { accountInfo } = useContext(AccountContext);

  useEffect(() => {
    if (!accountInfo?.token) {
      router.push("/");
    }
  }, [accountInfo, router]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<inputs>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await expenseService.getByIdAsync(
          idParam,
          accountInfo,
        );

        if (response.errors) {
          setErrorMessage(response.errors);
          return;
        }

        if (response.data) {
          reset({
            category: response.data.category,
            amount: response.data.amount,
            currency: response.data.currency,
            description: response.data.description,
            transactionType: response.data.transactionType,
            recordedAt: response.data.recordedAt,
          });
        }
      } catch (error) {
        setErrorMessage([(error as Error).message]);
      }
    };
    fetchData();
  }, [idParam, reset]);

  type inputs = {
    category: string;
    amount: number;
    currency: string;
    description: string;
    transactionType: "income" | "expense";
    recordedAt: string;
  };

  const onSubmit: SubmitHandler<inputs> = async (expense: inputs) => {
    const inputData = {
      category: expense.category,
      amount: expense.amount,
      currency: expense.currency,
      description: expense.description,
      transactionType: expense.transactionType,
      recordedAt: expense.recordedAt,
    };

    try {
      const response = await expenseService.updateByIdAsync(
        idParam,
        inputData,
        accountInfo,
      );

      if (response.errors) {
        setErrorMessage(response.errors);
      }

      router.push("/expenses");
    } catch (error) {
      setErrorMessage([(error as Error).message]);
    }
    [idParam];
  };

  return (
    <>
      <div className="text-centered-content">
        <h1>Edit Expense Page</h1>
        <p>Here you can edit a new expense.</p>
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
