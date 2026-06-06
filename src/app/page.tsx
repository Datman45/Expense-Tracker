"use client";

import { AccountContext } from "@/contex/AccountContex";
import { useContext } from "react";

export default function Home() {
  const { accountInfo, setAccountInfo } = useContext(AccountContext);

  return (
    <>
      <div className="text-centered-content mb-5">
        <h1>Welcome to the Expense Tracker!</h1>
        <p>Track your expenses and manage your budget effectively.</p>
      </div>
      <div className="text-centered-content">
        {accountInfo?.user ? (
          <>
            <h2>Your account details</h2>
            <p>Username: {accountInfo.user.username}</p>
            <p>First Name: {accountInfo.user.firstName}</p>
            <p>Last Name: {accountInfo.user.lastName}</p>
          </>
        ) : (
          <p> You are not logged in</p>
        )}
      </div>
    </>
  );
}
