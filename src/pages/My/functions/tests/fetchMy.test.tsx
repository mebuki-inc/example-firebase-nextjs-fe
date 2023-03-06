import { setupServer } from 'msw/node'
import { rest } from 'msw'

import { fetchMy } from '../fetchMy'
import { samples } from '../../fixtures/samples'

const mockServer = setupServer()
const stubResponseBody = samples['200']
const stubResponseBodyInvalid = {
  id: 'toooooooooooooooooooooooooooooooooooLong',
  name: '田中太郎'
}
const stubResponseBodyEmpty = undefined
const apiHost = 'http://localhost'
const path = '/v1/user/self'

describe('fetchClientsSearch', () => {
  beforeAll(() => {
    mockServer.listen()
  })
  afterAll(() => {
    mockServer.close()
  })

  describe('正常系', () => {
    test.each`
      status | response            | expected            | description
      ${200} | ${stubResponseBody} | ${stubResponseBody} | ${'正常にレスポンスが返却される場合、会員情報が正常に返却される'}
    `('$description', async ({ status, response, expected }) => {
      const handler = rest.get(apiHost + path, (req, res, ctx) => {
        return res(ctx.status(status), ctx.json(response))
      })
      mockServer.resetHandlers(handler)

      const actual = await fetchMy([path, 'stub-token'])
      expect(actual).toEqual(expected)
    })
  })

  describe('異常系', () => {
    test.each`
      status | response                   | expected                       | description
      ${400} | ${stubResponseBody}        | ${path + ': fetch error'}      | ${'BadRequestが返却された場合、fetch errorをthrowする'}
      ${500} | ${stubResponseBody}        | ${path + ': fetch error'}      | ${'InternalServerErrorが返却された場合、fetch errorをthrowする'}
      ${200} | ${stubResponseBodyInvalid} | ${path + ': invalid response'} | ${'不正のbodyが返却された場合、invalid responseをthrowする'}
      ${200} | ${stubResponseBodyEmpty}   | ${path + ': invalid response'} | ${'空のbodyが返却された場合、invalid responseをthrowする'}
    `('$description', async ({ status, response, expected }) => {
      const handler = rest.get(apiHost + path, (req, res, ctx) => {
        return res(ctx.status(status), ctx.json(response))
      })
      mockServer.resetHandlers(handler)

      await expect(fetchMy([path, 'stub-token'])).rejects.toThrow(expected)
    })
  })
})
