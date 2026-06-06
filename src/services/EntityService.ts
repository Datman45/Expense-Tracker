import { BaseService } from "./BaseService";
import { IResultObject } from "../types/IResultObject";
import { IAuthenticationDto } from "@/types/IAuthenticationDto";

export abstract class EntityService<TEntity> extends BaseService {
  constructor(private basePath: string) {
    super();
  }

  async getAllAsync(
    accountInfo?: IAuthenticationDto,
  ): Promise<IResultObject<TEntity[]>> {
    try {
      let options = {};
      if (accountInfo?.token) {
        options = {
          headers: {
            Authorization: `Bearer ${accountInfo.token}`,
          },
        };
      }
      const response = await this.axiosInstance.get<TEntity[]>(
        this.basePath,
        options,
      );

      return { data: response.data, statusCode: response.status };
    } catch (error) {
      return this.handleAxiosError<TEntity[]>(error);
    }
  }

  async createAsync(
    entity: TEntity,
    accountInfo?: IAuthenticationDto,
  ): Promise<IResultObject<TEntity>> {
    try {
      let options = {};

      if (accountInfo?.token) {
        options = {
          headers: {
            Authorization: `Bearer ${accountInfo.token}`,
          },
        };
      }

      const response = await this.axiosInstance.post<TEntity>(
        this.basePath,
        entity,
        options,
      );

      if (response.status >= 200 && response.status < 300) {
        return { data: response.data, statusCode: response.status };
      }

      return { data: response.data, statusCode: response.status };
    } catch (error) {
      return this.handleAxiosError<TEntity>(error);
    }
  }

  async getByIdAsync(
    id: number,
    accountInfo?: IAuthenticationDto,
  ): Promise<IResultObject<TEntity>> {
    try {
      let options = {};

      if (accountInfo?.token) {
        options = {
          headers: {
            Authorization: `Bearer ${accountInfo.token}`,
          },
        };
      }
      const response = await this.axiosInstance.get<TEntity>(
        `${this.basePath}/${id}`,
        options,
      );

      if (response.status >= 200 && response.status < 300) {
        return { data: response.data, statusCode: response.status };
      }

      return { data: response.data, statusCode: response.status };
    } catch (error) {
      return this.handleAxiosError<TEntity>(error);
    }
  }

  async updateByIdAsync(
    id: number,
    entity: TEntity,
    accountInfo?: IAuthenticationDto,
  ): Promise<IResultObject<TEntity>> {
    try {
      let options = {};

      if (accountInfo?.token) {
        options = {
          headers: {
            Authorization: `Bearer ${accountInfo.token}`,
          },
        };
      }
      const response = await this.axiosInstance.put<TEntity>(
        `${this.basePath}/${id}`,
        entity,
        options,
      );

      if (response.status >= 200 && response.status < 300) {
        return { data: response.data, statusCode: response.status };
      }

      return { data: response.data, statusCode: response.status };
    } catch (error) {
      return this.handleAxiosError<TEntity>(error);
    }
  }

  async deleteByIdAsync(
    id: number,
    accountInfo?: IAuthenticationDto,
  ): Promise<IResultObject<null>> {
    try {
      let options = {};

      if (accountInfo?.token) {
        options = {
          headers: {
            Authorization: `Bearer ${accountInfo.token}`,
          },
        };
      }
      const response = await this.axiosInstance.delete(
        `${this.basePath}/${id}`,
        options,
      );

      if (response.status >= 200 && response.status < 300) {
        return { data: null, statusCode: response.status };
      }

      return { data: null, statusCode: response.status };
    } catch (error) {
      return this.handleAxiosError<null>(error);
    }
  }
}
