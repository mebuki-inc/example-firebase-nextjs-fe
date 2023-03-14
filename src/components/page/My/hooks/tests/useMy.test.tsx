import { SWRConfig } from 'swr'
import { useRecoilValue } from 'recoil'
import { act, renderHook, RenderResult } from '@testing-library/react-hooks'
import { RenderHookResult } from '@testing-library/react-hooks/src/types'
import * as recoil from 'recoil'
import { setupServer } from 'msw/node'

import { useMy } from '../useMy'
import { handlers } from '../../fixtures/fetchMy.handers'
import { fetchMySamples } from '../../fixtures/fetchMy.samples'

type Result = RenderResult<ReturnType<typeof useMy>>

const mockServer = setupServer()

describe('useClientDetail', () => {
  beforeAll(() => mockServer.listen())
  afterAll(() => mockServer.close())
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(recoil, 'useRecoilValue').mockImplementation(() => {
      return {
        token: 'dummy-token'
      }
    })
  })

  const wrapper = ({ children }: any) => {
    return (
      <recoil.RecoilRoot>
        <SWRConfig value={{ provider: () => new Map() }}>{children}</SWRConfig>
      </recoil.RecoilRoot>
    )
  }

  let container: RenderHookResult<Result, any> | undefined
  let result: Result | undefined

  const initialExpected = {
    isError: false,
    isLoading: true,
    my: undefined
  }
  const successExpected = {
    isError: false,
    isLoading: false,
    my: fetchMySamples['200']
  }
  const failedExpected = {
    isError: true,
    isLoading: false,
    my: undefined
  }

  describe('正常系', () => {
    test('初期値', async () => {
      mockServer.resetHandlers(handlers.default)

      await act(async () => {
        container = await renderHook(() => useMy(), { wrapper })
        result = container.result
        expect(result?.current).toEqual(initialExpected)
      })
    })
    test('情報の取得に成功した場合、値が返却される', async () => {
      mockServer.resetHandlers(handlers.default)

      await act(async () => {
        container = await renderHook(() => useMy(), { wrapper })
        result = container.result
      })
      expect(result?.current).toEqual(successExpected)
    })
  })

  describe('異常系', () => {
    test('情報の取得に失敗した場合、値が返却される', async () => {
      mockServer.resetHandlers(handlers.error)

      await act(async () => {
        container = await renderHook(() => useMy(), { wrapper })
        result = container.result
      })
      expect(result?.current).toEqual(failedExpected)
    })
  })
})
