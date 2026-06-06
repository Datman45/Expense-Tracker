"use client";

import { IAuthenticationDto } from "@/types/IAuthenticationDto";
import { createContext } from "react";

export interface IAccountState {
  accountInfo?: IAuthenticationDto;
  setAccountInfo?: (value: IAuthenticationDto) => void;
}

export const AccountContext = createContext<IAccountState>({});
