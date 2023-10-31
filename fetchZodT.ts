import { ZodSchema, z } from "zod"
import fetchT from "./fetchT"

const fetchZodT = 
    <Schema extends ZodSchema>(schema: Schema) =>
    <ReuqestParams, RequestOption extends RequestInit>(buildParams: (params: ReuqestParams)=> string) =>
    async (params: ReuqestParams, init?: RequestOption): Promise<z.infer<typeof schema>> => {
        return new Promise((resolve, reject)=> {
            fetchT(buildParams)(params, init).then(resolve).catch(reject)
        })
}

export default fetchZodT;