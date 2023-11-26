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
const sequenceFetch = flow(
    joinStringWithRequestInit, // (string, string) => [string, RequestInit]
    (props) => fetch(...props), // [string, RequestInit] => Promise<Response>
    // interceptor,
    processReponse //Promise<Response> => Promise<any>
)


const result = sequenceFetch('https://jsonplaceholder.typicode.com/', 'todos/1')


result.then(console.log)

// fetch
fetch


// fetchAndResponse
const fetchAndResponse = flow(fetch, processReponse)

// myFetch
// 경로와 문자열을 합성하고, 헤더를 미리 세팅함.
const myFetch = flow(joinStringWithRequestInit, ([string, requestInit]) => fetchAndResponse(string, requestInit))

// safeMyFetch
// GET, POST 등의 메서드와 그에 따른 타입을 강화.

// (method: Method, param: T) => string(URL), RequestInit


// GET
// param<T> => string(URL), RequestInit

// POST
// param<T> => string(URL), { method: POST, body, ...RequestInit}


// safeMyFetch = flow(Get, joinStringWithRequestInit, ([string, requestInit]) => fetchAndResponse(string, requestInit))