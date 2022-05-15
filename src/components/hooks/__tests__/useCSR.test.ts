import Router, { useRouter } from 'next/router'
import { renderHook, act, RenderResult } from '@testing-library/react-hooks'

import { useCSR } from '../useCSR'

jest.mock('next/router')

const mockedUseRouter = jest.mocked(useRouter)
const mockedRouter = jest.mocked(Router)

let result: RenderResult<boolean> | undefined

describe('useCSR', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('CSRが発動しないパターン', () => {
    test.each`
      path                    | description
      ${'/'}                  | ${'パスが`/`のとき、Router.replaceを実行せずにtrueを返す'}
      ${'/path/to/not/exist'} | ${'パスがROUTESに存在しないとき、Router.replaceを実行せずにtrueを返す'}
    `('$description', async ({ path }) => {
      mockedUseRouter.mockReturnValue({ asPath: path } as any)
      mockedRouter.replace.mockResolvedValue(true)

      await act(async () => {
        result = renderHook(() => useCSR()).result
      })

      expect(mockedRouter.replace).toHaveBeenCalledTimes(0)
      expect(result?.current).toBe(true)
    })
  })

  describe('CSRが発動するパターン', () => {
    test.each`
      path         | href
      ${'/login'}  | ${'/login'}
      ${'/login/'} | ${'/login'}
    `(
      '$path が $href のパターンに合致するとき、Router.replaceを実行し、falseを返す',
      async ({ path, href }) => {
        mockedUseRouter.mockReturnValue({ asPath: path } as any)
        mockedRouter.replace.mockResolvedValue(true)

        await act(async () => {
          result = renderHook(() => useCSR()).result
        })

        expect(mockedRouter.replace).toHaveBeenCalledTimes(1)
        expect(mockedRouter.replace).toHaveBeenCalledWith(href, path)
        expect(result?.current).toBe(false)
      }
    )
  })
})
