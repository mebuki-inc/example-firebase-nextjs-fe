import { act, renderHook, RenderResult } from '@testing-library/react-hooks'
import { RenderHookResult } from '@testing-library/react-hooks/src/types'

import { useUserType } from './hooks'

type Result = RenderResult<ReturnType<typeof useUserType>>

jest.mock('next/router', () => require('next-router-mock'))

const mockedUseRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('useUserType', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  let container: RenderHookResult<Result, any> | undefined
  let result: Result | undefined

  test.each`
    query                       | expected        | description
    ${{ userType: 'CONSUMER' }} | ${'会員情報'}   | ${'クエリが`CONSUMER`のとき、`会員情報`を返す'}
    ${{ userType: 'COMPANY' }}  | ${'管理者情報'} | ${'クエリが`COMPANY`のとき、`管理者情報`を返す'}
    ${{ userType: 'hogehoge' }} | ${''}           | ${'クエリが空文字のとき、空文字を返す'}
    ${{}}                       | ${''}           | ${'クエリが空のとき、空文字を返す'}
  `('$description', async ({ query, expected }) => {
    mockedUseRouter.mockReturnValue({ query: query } as any)

    await act(async () => {
      container = await renderHook(() => useUserType())
      result = container.result
      expect(result?.current).toEqual({ typeText: expected })
    })
  })
})
