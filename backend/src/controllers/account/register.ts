import { RegisterDao } from "../../dao/account/register";
import { RegisterRequestBody } from "../../types";

export class RegisterController {
  constructor(private registerDao: RegisterDao) {}

  async createUser(userData: RegisterRequestBody) {
    const newUser = await this.registerDao.create(userData);
    return newUser;
  }
}
