import { User } from "../../../models";
import { RegisterRequestBody } from "../../../types";

export interface RegisterDao {
  create(user: RegisterRequestBody): Promise<User | undefined>;
}
