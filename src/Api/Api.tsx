import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";
import base64 from "base-64";

import ApiConf from "./ApiConf.json";

export class Api {
  config: AxiosRequestConfig = {
    headers: {},
  };
  baseUrl: string | undefined;
  instance: AxiosInstance;

  constructor() {
    this.baseUrl = ApiConf.credentials.url;
    this.instance = axios.create(this.config);
    this.instance.interceptors.response.use(
      this.successHandler,
      this.errorHandler
    );
  }

  private async authorizeRequest(path: string) {
    const username = ApiConf.credentials.user;
    const password = ApiConf.credentials.password;
    const authStr = base64.encode(username + ":" + password);

    this.config.headers.Authorization = `Basic ${authStr}`;
    if (path.charAt(0) !== "/") {
      return `${this.baseUrl}/${path}`;
    }
    return `${this.baseUrl}${path}`;
  }

  async get<T, R = AxiosResponse<T>>(path: string): Promise<R> {
    return this.instance.get(await this.authorizeRequest(path), {
      ...this.config,
    });
  }

  async post<T, B, R = AxiosResponse<T>>(path: string, data?: B): Promise<R> {
    return this.instance.post(await this.authorizeRequest(path), data, {
      ...this.config,
    });
  }

  successHandler(response: AxiosResponse): AxiosResponse {
    return response;
  }

  errorHandler(error: AxiosError): Promise<AxiosError> {
    if (error.response) {
    } else if (error.request) {
    } else {
    }

    return Promise.reject(error.response);
  }
}
