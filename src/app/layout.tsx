"use client";

import "bootstrap/dist/css/bootstrap.css";
import { Inter } from "next/font/google";
import "./globals.css";
import BootstrapActivation from "@/components/BootstrapActivation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { IAuthenticationDto } from "@/types/IAuthenticationDto";
import { AccountContext } from "@/contex/AccountContex";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [accountInfo, setAccountInfo] = useState<
    IAuthenticationDto | undefined
  >(undefined);

  useEffect(() => {
    const storedAccountInfo = localStorage.getItem("_accountInfo");
    if (!storedAccountInfo) return;

    Promise.resolve().then(() => {
      try {
        setAccountInfo(JSON.parse(storedAccountInfo));
      } catch {
        setAccountInfo(undefined);
      }
    });
  }, []);

  const updateAccountInfo = (value: IAuthenticationDto) => {
    setAccountInfo(value);
    if (!value.token) {
      localStorage.removeItem("_accountInfo");
    } else {
      localStorage.setItem("_accountInfo", JSON.stringify(value));
    }
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <AccountContext.Provider
          value={{
            accountInfo,
            setAccountInfo: updateAccountInfo,
          }}
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <BootstrapActivation />
        </AccountContext.Provider>
      </body>
    </html>
  );
}
