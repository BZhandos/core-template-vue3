export interface BaseResponse<T> {
  data: T;
  success: boolean;
}

export interface ILoginParams {
  login: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  // refresh_token: string;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}
