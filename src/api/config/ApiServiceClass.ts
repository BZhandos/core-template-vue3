import type { AxiosInstance, AxiosResponse } from "axios";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
}

interface IConfigAPI {
  axios: AxiosInstance;
  serviceUrl: string;
}

export class ApiServiceClass {
  protected axios: AxiosInstance;
  protected serviceUrl: string;

  constructor(config: IConfigAPI) {
    this.axios = config.axios;
    this.serviceUrl = config.serviceUrl;
  }

  protected async POST<T>(
      url: string,
      data: Record<string, any> = {},
      headers: Record<string, any> = {},
      params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios({
        url: `${this.serviceUrl}/${url}`,
        method: "POST",
        data,
        headers,
        params,
      });
      if (response.status && response.status >= 200 && response.status < 300) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        data: error,
      };
    }
  }

  protected async GET<T>(
      url: string,
      params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios({
        url: `${this.serviceUrl}/${url}`,
        params,
        method: "GET",
      });
      if (response.status && response.status >= 200 && response.status < 300) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        data: error,
      };
    }
  }

  protected async GET_FILE<T>(
      url: string,
      params: Record<string, any> = {},
      options: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios({
        url: `${this.serviceUrl}/${url}`,
        params,
        method: "GET",
        responseType: 'blob',
      });
      if (response.status && response.status >= 200 && response.status < 300) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        data: error,
      };
    }
  }

  protected async PUT<T>(
      url: string,
      data: Record<string, any> = {},
      headers: Record<string, any> = {},
      params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios({
        url: `${this.serviceUrl}/${url}`,
        method: "PUT",
        data,
        headers,
        params,
      });
      if (response.status && response.status >= 200 && response.status < 300) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: response.data,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        data: error,
      };
    }
  }

  protected async DELETE<T>(
      url: string,
      data: Record<string, any> = {},
      headers: Record<string, any> = {},
      params: Record<string, any> = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axios({
        url: `${this.serviceUrl}/${url}`,
        method: "DELETE",
        data,
        headers,
        params,
      });
      if (response.status && response.status >= 200 && response.status < 300) {
        return {
          success: true,
        };
      } else {
        return {
          success: false,
        };
      }
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
