import { flow } from "@mobily/ts-belt";
import interceptor from "./response/interceptor";
import toJSON from "./response/consumeResponse";
import GET from "./request/GET";
import { z } from "zod";
import withSchema from "./response/withSchema";
import POST from "./request/POST";
import appendRequest from "./request/appendReuqest";
import { MyRequest } from "./request/types";


// GET

const getSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
})

// flow <- <Fragment></Fragment>
const consumeWithSchema = flow(
    consumeResponse,
    withSchema(getSchema)
)
// (path: P) => [Info, Init]
// [Info, Init] => Promise<Response>
// Promise<Response> => Promise<any>
// Promise<any> => Promise<ZodSchema>

const makePath = (params: {todoID: number}) => {
    return `todos/${params.todoID}`
}
// (P) => [Info, Init]
// [Info, Init] => Promise<Response>
// Promise<Response> = > Promise<any>
// Promise<any> => Promise<Zod>

const getPost = flow(
    GET('https://jsonplaceholder.typicode.com/', makePath),
    ([info, init]) => fetch(info, init), 
    toJSON,
    withSchema(getSchema))

const result = getPost({
    todoID: 1
})

// get({todoID: 1})

//  (string, makePath) => [RequestInfo, RequestInit] => Promise<Response> => Promise<any> => Promise<ZodSch

// get({todoID: 1})

// get(['http://localhost:3000', {}]).then(async (res)=> {
//     await res.json()
// })

// get({todoID: 1}).then(console.log)

// POST

const postSchema = z.object({
    id: z.number(),
}) 






//  (string, makeBody) => [RequestInfo, RequestInit] => [RequestInfo, RequestInit] => 
// Promise<Response> => Promise<Response> => Promise<Response> => Promise<any> => Promise<ZodSch


const consumeResponse2 = async (response: Promise<Response>): Promise<any> => {
    const resolvePromise = response
    if((await response).statusText === 'Invalid Token') return NextResonse.redirect()
    return resolvePromise
}

401

{ }
200

{ }

const makeBody = ({title, body, userId}: { title: string, body: string, userId: number }) => {
    return JSON.stringify({title, body, userId})
}

const PostWithDefaultHeader = flow(
    POST('https://jsonplaceholder.typicode.com/posts/', makeBody),
    appendRequest({headers: {
        'custom': 'test',
        'Content-type': 'application/json; charset=UTF-8',
    }})
)

// F#?

const pipeConsole = <T,>(data: T): T => {
    console.log(data)
    return data
}

const processResponse = flow(
    refreshInterceptor,
    toJSON,
    withSchema(getSchema)
)

const withOutZod = flow(
    refreshInterceptor,
    toJSON,
)

const singupPost = flow(
    POST('https://jsonplaceholder.typicode.com/posts/', makeBody),
    appendRequest({headers: {
        'custom': 'test',
        'Content-type': 'application/json; charset=UTF-8',
    }}),
    ([req, init]) => fetch(req, init), 
    withOutZod
)



// post(['https://localhost:3000', {}]).then(console.log)

// fetch('g').then((v)=> {
//     await v.json()
// })