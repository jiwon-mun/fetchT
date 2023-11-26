// 

import { flow } from "@mobily/ts-belt";


const processReponse = async (response: Promise<Response>): Promise<any> => {
    const resolvePromise = await response

    if (resolvePromise.ok === false) {
        throw new Error('Failed to fetch data');
    }

    // // 4. JSON 타입으로 정규화한다.
    return resolvePromise.json();
}

const joinString = (a: string, b: string) => `${a}${b}`

const withRequestInit = (requestInit: RequestInit) => (baseURL: string, path: string): [string, RequestInit] => [joinString(baseURL,path), requestInit]

const joinStringWithRequestInit =  withRequestInit({
    headers: {
        'hwahae-main-web-api-token': process.env.HWAHAE_MAIN_WEB_API_TOKEN || '',
        'hwahae-user-id': process.env.HWAHAE_USER_ID || '',
    },
})


// (RequestInit) => (string, string) => [string, Requestinit]
// [string, Requestinit] => Promise<Response>
    // Promise<Response> => Promise<Response<Interceptor>>
// Promise<Response<any>>
const hwahaeFetch = flow(
    joinStringWithRequestInit, // (string, string) => [string, RequestInit]
    ([string, requestInit]) => fetch(string, requestInit), // [string, RequestInit] => Promise<Response>
    // interceptor,
    processReponse //Promise<Response> => Promise<any>
)


const result = hwahaeFetch('https://jsonplaceholder.typicode.com/', 'todos/1')


result.then(console.log)