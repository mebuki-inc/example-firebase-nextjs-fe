import { SWRConfig } from 'swr'
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { act, renderHook, RenderResult } from '@testing-library/react-hooks'
import { RenderHookResult } from '@testing-library/react-hooks/src/types'
import { mocked } from 'jest-mock'
import * as recoil from 'recoil'

import { useMy } from '../useMy'
import { setupServer } from 'msw/node'
import { handlers } from '../../handers/fetchMy.handers'
import { samples } from '../../fixtures/samples'

type Result = RenderResult<ReturnType<typeof useMy>>

const mockServer = setupServer()

jest.mock('recoil')
const mockedUseRecoilValue = mocked(useRecoilValue)

describe('useClientDetail', () => {
  mockedUseRecoilValue.mockReturnValue({ token: 'test-token' })

  beforeEach(() => {
    mockServer.listen()
  })
  afterAll(() => {
    mockServer.close()
  })

  const wrapper = ({ children }: any) => {
    return (
      <SWRConfig value={{ provider: () => new Map() }}>
        {children}
        <RecoilRoot>{children}</RecoilRoot>
      </SWRConfig>
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
    my: samples['200']
  }

  test('初期値', async () => {
    mockServer.resetHandlers(handlers.default)

    await act(async () => {
      container = await renderHook(() => useMy(), { wrapper })
      result = container.result
      expect(result?.current).toEqual(initialExpected)
    })
  })

  test('情報の取得に成功した場合、取得した値が返却される', async () => {
    mockServer.resetHandlers(handlers.default)

    await act(async () => {
      container = await renderHook(() => useMy(), { wrapper })
      result = container.result
    })

    expect(result?.current).toEqual(successExpected)
  })
})
