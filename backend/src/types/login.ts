import { components } from "../schemas";

export type LoginRequestBody = components["schemas"]["login"];

export interface LoginResponseBody {
  id: string;
  username: string;
}
