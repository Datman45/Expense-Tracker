import { LoginDao } from "../../dao/account/login";
import { LoginRequestBody } from "../../types";

export class LoginController {
  constructor(private loginDao: LoginDao) {}

  async findUserByUsername(userData: LoginRequestBody) {
    const user = await this.loginDao.findUserByUsername(userData);
    return user;
  }
}
