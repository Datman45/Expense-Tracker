"use client";

import { useContext, useEffect, useState } from "react";
import { IExpense } from "@/types/domain/IExpense";
import { ExpensesService } from "@/services/ExpensesService";
import { useRouter, useParams } from "next/navigation";
import { AccountContext } from "@/contex/AccountContex";

export default function DeleteExpense() {
  const params = useParams();
  const router = useRouter();
  const idParam = Number(params.id);
  const [data, setData] = useState<IExpense>();
  const [errors, setErrorMessage] = useState<string[]>();
  const expenseService = new ExpensesService();
  const { accountInfo } = useContext(AccountContext);

  useEffect(() => {
    if (!accountInfo?.token) {
      router.push("/");
    }
  }, [accountInfo, router]);

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

        setData(response.data);
      } catch (error) {
        setErrorMessage([(error as Error).message]);
      }
    };
    fetchData();
  }, [idParam]);

  return (
    <>
      <div className="text-centered-content">
        <h1>Delete Expense Page</h1>
        <p>Here you can delete a new expense.</p>
        <p>Expense ID: {idParam}</p>
        <p>Category: {data?.category}</p>
        <p>Amount: {data?.amount}</p>
        <p>Currency: {data?.currency}</p>
        <p>Description: {data?.description}</p>
        <p>Transaction Type: {data?.transactionType}</p>
        <p>Recorded At: {data?.recordedAt}</p>

        <button
          className="btn btn-danger"
          onClick={async (e) => {
            e.preventDefault();
            try {
              await expenseService.deleteByIdAsync(idParam, accountInfo);
              router.push("/expenses");
            } catch (error) {
              setErrorMessage([(error as Error).message]);
            }
          }}
        >
          Delete
        </button>
      </div>
    </>
  );
}
