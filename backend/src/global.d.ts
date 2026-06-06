import { Express } from "express";

declare module "express" {
  interface Request {
    timestamp?: number;
  }
}
