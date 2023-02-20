import useSWR from 'swr'

import { fetchMy } from '../functions/fetchMy'

const PATH = '/v1/user/self'

export const useMy = () => {
  const token = 'test-token'

  const { data, error } = useSWR([PATH, token], fetchMy)

  // console.log('data', data)

  return {
    isLoading: !Boolean(data) && !Boolean(error),
    isError: Boolean(error),
    my: data
  }
}

// import { useState } from 'react'
// export const useMy = () => {
//   const [name, setName] = useState<string>('')
//   const [isError, setIsError] = useState<Boolean>(false)
//
//   const fetch = async () => {
//     const token = 'test-token'
//     try {
//       const data = await fetchMy(PATH, token)
//       setName(data.name)
//       setIsError(false)
//     } catch (e) {
//       setIsError(true)
//     }
//   }
//
//   console.log('name', name)
//
//   return {
//     isError: isError || !Boolean(name),
//     // fetch,
//     isLoading: !Boolean(name),
//     my: {
//       id: 'fake-id',
//       name: name
//     }
//   }
// }
