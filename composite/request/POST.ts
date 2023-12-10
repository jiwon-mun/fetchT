import { MyRequest } from "./types"

// 리퀘스트를 보내줄 것 같이 생겼다.
const POST = <P>(baseURL: string, makeBody: (params: P)=> string) => (params: P): MyRequest =>  {
    return [`${baseURL}`, {method: 'POST', body: makeBody(params)}]
}

export default POST