import { components } from "../schemas";

export type RegisterRequestBody = components["schemas"]["register"];

export interface RegisterResponseBody {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}
