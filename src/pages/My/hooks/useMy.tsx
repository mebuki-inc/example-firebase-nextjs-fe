import { useState } from 'react'
import { fetchMy } from '../functions/fetchMy'

const PATH = '/v1/user/self'

export const useMy = () => {
  const [name, setName] = useState<string>('')
  const [isError, setIsError] = useState<Boolean>(false)

  const fetch = async () => {
    const token = 'test-token'
    try {
      const data = await fetchMy(PATH, token)
      setName(data.userName)
      setIsError(false)
    } catch (e) {
      setIsError(true)
    }
  }

  return {
    isError: isError || !Boolean(name),
    fetch,
    name
  }
}
