import { renderHook, act, RenderResult } from '@testing-library/react-hooks'

import { useCSR } from '../useCSR'
import { redirect, usePathname } from 'next/navigation'

jest.mock('next/router')
jest.mock('next/navigation')

const mockedUsePathName = jest.mocked(usePathname)
const mockedRedirect = jest.mocked(redirect)

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
      mockedUsePathName.mockReturnValue({ asPath: path } as any)

      await act(async () => {
        result = renderHook(() => useCSR()).result
      })

      expect(mockedRedirect).toHaveBeenCalledTimes(0)
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
        mockedUsePathName.mockReturnValue(path)

        await act(async () => {
          result = renderHook(() => useCSR()).result
        })

        expect(mockedRedirect).toHaveBeenCalledTimes(1)
        expect(mockedRedirect).toHaveBeenCalledWith(href, path)
        expect(result?.current).toBe(false)
      }
    )
  })
})
