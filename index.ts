import { z } from 'zod'
import fetchZodT from './fetchZodT';

export { default as fetchZodT } from './fetchZodT'

const API = `https://jsonplaceholder.typicode.com/todos`;
// {
//     "userId": 1,
//     "id": 1,
//     "title": "delectus aut autem",
//     "completed": false
//   }
  
const schema = z.array(z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    completed: z.boolean()
}))

interface Params {
    query: {
        completed: boolean
    }
}
const buildParams = ({query}: Params) => {
    const querystring = Object.entries(query).reduce((prev, [key, value])=> ({...prev, [key]: value.toString()}), {})
    return `${API}?${new URLSearchParams(querystring).toString()}`
}

const runner = async () => {
    const fetchBooks = fetchZodT(schema)(buildParams)
    const books = await fetchBooks({
        query: {
            completed:true
        }
    })
    console.log("result::", books[0].title)
}

runner()
