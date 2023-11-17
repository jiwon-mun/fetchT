import axios, { AxiosInstance } from "axios";

declare module "axios" {
  interface AxiosInstance<T = any, D = any, P = any> {
    create<T>(config?: CreateAxiosDefaults): AxiosInstance<T>;

    interceptors: {
      request: AxiosInterceptorManager<InternalAxiosRequestConfig<D>>;
      response: AxiosInterceptorManager<AxiosResponse<T, D>>;
    };

    get<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: MyAxiosRequestConfig<D, P>
    ): Promise<R>;
  }

  interface MyAxiosRequestConfig<D, P> extends AxiosRequestConfig<D> {
    params?: P;
  }
}

const magic = <FirstResponse = any, Request = any, BODY = any>() => {
  const instance: AxiosInstance<FirstResponse, Request, BODY> = axios.create();
  return instance;
};

const instance = magic<{ id: 1 }, { password: 2 }, { body: 1 }>();

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

(async()=> {
  const {data} = await instance.get<{name: 1}>("", {
    params: {
      body: 1
    },
  });


  data.name
})
