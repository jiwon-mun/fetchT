import axios, { AxiosInstance } from "axios";

declare module "axios" {
  interface AxiosInstance<T = any> {
    create<T>(config?: CreateAxiosDefaults): AxiosInstance<T>;

    interceptors: {
      request: AxiosInterceptorManager<InternalAxiosRequestConfig>;
      response: AxiosInterceptorManager<AxiosResponse<T, T>>;
    };
  }
}

const magic = <T>() => {
  const instance: AxiosInstance<T> = axios.create();
  return instance;
};

const instance = magic<{ id: 1 }>();

instance.interceptors.response.use(
  function (response) {
    response.data;
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
