import { MyRequest } from "./types"

const GET = <P>(baseURL: string, makePath: (params: P)=> string) => (params: P): MyRequest =>  {
    return [`${baseURL}${makePath(params)}`, {}]
}

const makePath = (params: {todoID: number}) => {
    return `todo/${params.todoID}`
}

const get = GET('https://jsonplaceholder.typicode.com/', makePath)

export default GET