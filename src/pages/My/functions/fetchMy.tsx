import { fetch } from '../../../functions'

type Response = {
  id: string
  name: string
}

export const fetchMy = async ([path, token]: string[]): Promise<Response> => {
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
