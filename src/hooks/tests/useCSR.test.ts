import { renderHook, act, RenderResult } from '@testing-library/react-hooks'
import mockRouter from 'next-router-mock'
import { useCSR } from '../useCSR'

jest.mock('next/router', () => require('next-router-mock'))

const mockedUseRouter = jest.spyOn(require('next/router'), 'useRouter')
const mockedReplace = jest.spyOn(mockRouter, 'replace')

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
      mockedReplace.mockResolvedValue(true)

      await act(async () => {
        result = renderHook(() => useCSR()).result
      })

      expect(mockedReplace).toHaveBeenCalledTimes(0)
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
        mockedReplace.mockResolvedValue(true)

        await act(async () => {
          result = renderHook(() => useCSR()).result
        })

        expect(mockedReplace).toHaveBeenCalledTimes(1)
        expect(mockedReplace).toHaveBeenCalledWith(href, path)
        expect(result?.current).toBe(false)
      }
    )
  })
})
