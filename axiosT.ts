import axios, { AxiosInstance } from "axios";

declare module "axios" {
  interface AxiosInstance<T = any, D = any, P = any> {
    create<T>(config?: CreateAxiosDefaults): AxiosInstance<T>;

    interceptors: {
      request: AxiosInterceptorManager<InternalAxiosRequestConfig<D, P>>;
      response: AxiosInterceptorManager<AxiosResponse<T, D>>;
    };

    get<T = any, R = AxiosResponse<T>, D = any>(
      url: string,
      config?: MyAxiosRequestConfig<D, P>
    ): Promise<R>;
  }

  interface InternalAxiosRequestConfig<D, P = any> {
    params?: P
  }

  interface MyAxiosRequestConfig<D, P> extends AxiosRequestConfig<D> {
    params?: P;
  }
}

const createInstance = <FirstResponse = any, Request = any, BODY = any>() => {
  const instance: AxiosInstance<FirstResponse, Request, BODY> = axios.create();
  return instance;
};

const instance = createInstance<{ resData: 1 }, { bodyParam: 2 }, { queryParam: 3 }>();

instance.interceptors.request.use(
  function (request) {
    request.data?.bodyParam;
    request.params?.queryParam
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

interface FinalResponse {
  finalRes: 1
}

(async()=> {
  const {data} = await instance.get<FinalResponse>("", {
    params: {
      queryParam: 3
    },
  });


  data.finalRes
})
