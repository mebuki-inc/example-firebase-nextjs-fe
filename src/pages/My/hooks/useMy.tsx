import useSWR from 'swr'
import { useRecoilValue } from 'recoil'

import { fetchMy } from '../functions/fetchMy'
import { authAtom } from '../../../state/atoms'

const PATH = '/v1/user/self'

export const useMy = () => {
  const { token } = useRecoilValue(authAtom)
  const { data, error, isLoading } = useSWR([PATH, token], fetchMy)

  return {
    isLoading: Boolean(isLoading),
    isError: Boolean(error),
    my: data
  }
}
