import { MyRequest } from "./types";

const appendRequest = (requestInit: RequestInit) => (req: MyRequest): MyRequest =>  {
    return [req[0], {...req[1], ...requestInit}] 
}

export default appendRequest