import { User } from "../../../models";
import { LoginRequestBody } from "../../../types";

export interface LoginDao {
  findUserByUsername(user: LoginRequestBody): Promise<User | undefined>;
}
