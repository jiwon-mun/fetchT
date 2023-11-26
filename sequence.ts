// 

import { flow } from "@mobily/ts-belt";


const processReponse = async (response: Promise<Response>): Promise<any> => {
    const resolvePromise = await response
    if (resolvePromise.ok === false) {
        throw new Error('Failed to fetch data');
    }
    return resolvePromise.json();
}

const joinString = (a: string, b: string) => `${a}${b}`

const withRequestInit = (requestInit: RequestInit) => (baseURL: string, path: string): [string, RequestInit] => [joinString(baseURL,path), requestInit]

const joinStringWithRequestInit =  withRequestInit({
    headers: {
        'signiture': process.env.SIG || '',
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