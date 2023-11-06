import axios, { AxiosInstance } from "axios";

declare module "axios" {
  interface AxiosInstance<T = any, D = any> {
    create<T>(config?: CreateAxiosDefaults): AxiosInstance<T>;

    interceptors: {
      request: AxiosInterceptorManager<InternalAxiosRequestConfig<D>>;
      response: AxiosInterceptorManager<AxiosResponse<T, D>>;
    };

    get<P = any, T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: MyAxiosRequestConfig<D, P>
    ): Promise<R>;
  }

  interface MyAxiosRequestConfig<D, P> extends AxiosRequestConfig<D> {
    params?: P;
  }

  interface Axios {
    get<P = any, T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: MyAxiosRequestConfig<D, P>
    ): Promise<R>;
  }
  interface AxiosRequestConfig<D = any> {}
}

const magic = <Params, T = any, D = any>(
  buildParams: (params: Params) => string,
  params: Params
) => {
  const instance: AxiosInstance<T, D> = axios.create();
  const url = buildParams(params);
  return instance;
};

const instance = magic<{ id: 1 }, { password: 2 }>((id) => "https://" + id, {
  id: 1,
});

instance.interceptors.request.use(
  function (request) {
    request.params;
    request.data?.password;
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    response.data;
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.get<{ body: 1 }>("", {
  params: {
    body: 1,
  },
});
