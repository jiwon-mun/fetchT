import { MyRequest } from "./types"

const POST = <P>(baseURL: string, makeBody: (params: P)=> string) => (params: P): MyRequest =>  {
    return [`${baseURL}`, {method: 'POST', body: makeBody(params)}]
}

export default POST