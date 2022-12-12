import { fetch } from '../../../functions'

type Response = {
  userName: string
}

export const fetchMy = async (path: string, token: string): Promise<Response> => {
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const { body, error } = await fetch<Response>(path, headers)

  if (error) {
    throw Error(`${path}: fetch error`)
  }
  if (!body) {
    throw new Error(`${path}: invalid response`)
  }

  return body
}
