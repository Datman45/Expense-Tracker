import { IResultObject } from "@/types/IResultObject";
import axios, { AxiosError, AxiosInstance } from "axios";

export abstract class BaseService {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "https://expense-tracker-hfrc.onrender.com",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  protected handleAxiosError<T>(error: unknown): IResultObject<T> {
    const axiosError = error as AxiosError<{ error: string }>;
    return {
      statusCode: axiosError.response?.status,
      errors: [
        axiosError.response?.data.error ??
          axiosError.message ??
          "Unknown error",
      ],
    };
  }
}
