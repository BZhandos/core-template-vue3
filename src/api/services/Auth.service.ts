/**
 *  Сервис для аутентикации
 * Swagger
 * {@link https://test4-accountingservicebackend.halykmarket.com/api/swagger-ui/index.html}
 * */

import { ApiServiceClass } from "../config/ApiServiceClass";
import type { BaseResponse, ILoginParams, ILoginResponse } from "../@types/Auth.type"
import type { AxiosInstance } from "axios";
import cookie from "js-cookie";

export class AuthService extends ApiServiceClass {
  constructor(axios: AxiosInstance) {
    super({
      axios: axios,
      serviceUrl: "auth",
    });
  }

  async Login(params: ILoginParams) {
    const response: any = await this.POST<BaseResponse<ILoginResponse>>(`authenticate`, params);
    if (response.success) {
      cookie.set("accessToken", response.data.accessToken);
    } else {
      let msg = "Неверный пароль или логин";
      if (response.data.error !== "BadCredentialsException") {
        msg = "Проверьте подключение к VPN";
      }
      throw new Error(msg);
    }
    return response;
  }
}
