import { ZodSchema, z } from "zod";

// {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }


const withSchema = <T extends ZodSchema>(schema: T) => async (request: Promise<any>) : Promise<z.infer<typeof schema>> => {
    const req = await request
    return schema.parse(req)
}

export default withSchema