"use client";

import { IExpense } from "@/types/domain/IExpense";
import { useContext, useEffect, useState } from "react";
import { ExpensesService } from "@/services/ExpensesService";
import { AccountContext } from "@/contex/AccountContex";
import { useParams, useRouter } from "next/navigation";

export default function ViewExpenses() {
  const params = useParams();
  const idParam = Number(params.id);
  const expenseService = new ExpensesService();
  const [data, setData] = useState<IExpense>();
  const [errors, setErrorMessage] = useState<string[]>();
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
        const result = await expenseService.getByIdAsync(idParam, accountInfo);

        if (result.errors) {
          return;
        }

        setData(result.data);
      } catch (error) {
        setErrorMessage([(error as Error).message]);
      }
    };
    fetchData();
  }, [idParam, accountInfo]);
  return (
    <>
      <div className="text-centered-content">
        <h1>Expenses Page</h1>
        <p>Here you can view and manage your expenses.</p>
        <p>Category: {data?.category}</p>
        <p>Amount: {data?.amount}</p>
        <p>Currency: {data?.currency}</p>
        <p>Description: {data?.description}</p>
        <p>Transaction Type: {data?.transactionType}</p>
        <p>Recorded At: {data?.recordedAt}</p>
      </div>
    </>
  );
}
