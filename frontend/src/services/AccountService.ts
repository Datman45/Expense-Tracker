import { IResultObject } from "@/types/IResultObject";
import { BaseService } from "./BaseService";
import { IAuthenticationDto } from "@/types/IAuthenticationDto";
import { IAccount } from "@/types/domain/IAccount";

export class AccountService extends BaseService {
  async loginAsync(
    username: string,
    password: string,
  ): Promise<IResultObject<IAuthenticationDto>> {
    const url = "/account/login";

    const loginData = {
      username,
      password,
    };

    try {
      const response = await this.axiosInstance.post<IAuthenticationDto>(
        url,
        loginData,
      );

      if (response.status <= 300) {
        return {
          statusCode: response.status,
          data: response.data,
        };
      }
      return {
        statusCode: response.status,
        errors: [
          (response.status.toString() + " " + response.statusText).trim(),
        ],
      };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  async registerAsync(
    registerData: IAccount,
  ): Promise<IResultObject<IAuthenticationDto>> {
    const url = "/account/register";

    try {
      const response = await this.axiosInstance.post<IAuthenticationDto>(
        url,
        registerData,
      );

      if (response.status <= 300) {
        return {
          statusCode: response.status,
          data: response.data,
        };
      }

      return {
        statusCode: response.status,
        errors: [
          (response.status.toString() + " " + response.statusText).trim(),
        ],
      };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }
}
