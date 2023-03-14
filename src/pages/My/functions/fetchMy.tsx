import { z } from 'zod'
import { fetch } from '../../../functions'

const schema = z.object({
  id: z.string().uuid(),
  name: z.string()
})
type Response = z.infer<typeof schema>

export const fetchMy = async ([path, token]: string[]): Promise<Response> => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const { body, error } = await fetch<Response>(path, headers)

  if (error) {
    throw Error(`${path}: fetch error`)
  }
  if (!schema.safeParse(body).success) {
    throw new Error(`${path}: invalid response`)
  }

  return body
}
