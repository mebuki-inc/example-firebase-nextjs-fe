import useSWR from 'swr'
import { useRecoilValue } from 'recoil'

import { fetchMy } from '../functions/fetchMy'
import { authAtom, myAtom } from '../../../state/atoms'

const PATH = '/v1/user/self'

export const useMy = () => {
  const { token } = useRecoilValue(authAtom)
  const { data, error } = useSWR([PATH, token], fetchMy)

  return {
    isLoading: !Boolean(data) && !Boolean(error),
    isError: Boolean(error),
    my: data
  }
}
