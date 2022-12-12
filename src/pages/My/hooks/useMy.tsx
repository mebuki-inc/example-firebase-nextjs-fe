import { useState } from 'react'
import { fetchMy } from '../functions/fetchMy'

const PATH = '/v1/user/self'

export const useMy = () => {
  const [name, setName] = useState<string>('')

  const fetch = async () => {
    const token = 'test-token'
    const data = await fetchMy(PATH, token)
    setName(data.userName)
  }

  return {
    isError: !Boolean(name),
    fetch,
    name
  }
}
