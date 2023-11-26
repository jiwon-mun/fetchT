import { flow } from "@mobily/ts-belt";
import interceptor from "./response/interceptor";
import consumeResponse from "./response/consumeResponse";
import GET from "./request/GET";
import { z } from "zod";
import withSchema from "./response/withSchema";
import POST from "./request/POST";
import appendRequest from "./request/appendReuqest";

const getSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
})


// GET

const makePath = (params: {todoID: number}) => {
    return `todos/${params.todoID}`
}

const get = flow(
    GET('https://jsonplaceholder.typicode.com/', makePath),
    ([req, init]) => fetch(req, init), 
    // interceptor,
    consumeResponse,
    withSchema(getSchema)
)

get({todoID: 1}).then(console.log)

// POST

const postSchema = z.object({
    id: z.number(),
}) 

const makeBody = ({title, body, userId}: { title: string, body: string, userId: number }) => {
    return JSON.stringify({title, body, userId})
}

const post = flow(
    POST('https://jsonplaceholder.typicode.com/posts', makeBody),
    appendRequest({headers: {
        'custom': 'test',
        'Content-type': 'application/json; charset=UTF-8',
    }}),
    ([req, init]) => fetch(req, init), 
    consumeResponse,
    // interceptor,
    withSchema(postSchema)
)

post({
    title: 'foo',
    body: 'bar',
    userId: 1
}).then(console.log)

