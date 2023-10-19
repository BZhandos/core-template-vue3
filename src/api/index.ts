/**
 *  Все сервисы регистрируются и создавать в констркторе. У каждого сможет быть свой serviceUrl(микросервис френдли)
 * */

import axios, { type AxiosInstance } from "axios";
import cookie from "js-cookie";
import router from "@/router";

import { AuthService } from "./services/Auth.service";

export interface IDictionary {
  [key: string]: any;
}

export class API {
  private axios: AxiosInstance;

  public Auth: AuthService;

  constructor(config: IDictionary) {
    this.axios = axios.create({
      baseURL: config.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      // если все же решим менеджерить токен на бэке
      // withCredentials: true,
    });
    this.axios.interceptors.request.use(
      async (config) => {
        const ACCESS_TOKEN = cookie.get("accessToken");
        if (config?.headers && ACCESS_TOKEN) {
          config.headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axios.interceptors.response.use(
      (response) => response,
      async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 403) {
          await router.push({ name: "Login" });
        }
        if (
          err.response.status === "token expired status" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          const { data } = await this.axios.post("/auth/refresh", {
            refresh_token: cookie.get("refreshToken"),
          });
          if (data.error) {
            cookie.remove("accessToken");
            cookie.remove("refreshToken");
            await router.push({ name: "Login" });
          } else {
            cookie.set("accessToken", data.access_token);
            if ((this?.axios?.defaults?.headers as any)?.["Authorization"]) {
              (this.axios.defaults.headers as any)[
                "Authorization"
              ] = `Bearer ${data.access_token}`;
            }
            return this.axios(originalRequest);
          }
        }
        return err.response;
      }
    );

  this.Auth = new AuthService(this.axios);
  }
}
