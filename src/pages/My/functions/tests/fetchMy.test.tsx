import nock from 'nock'

import { fetchMy } from '../fetchMy'
import { samples } from '../../fixtures/samples'

const stubResponseBody = samples['200']
const stubResponseBodyInvalid = {
  id: 'toooooooooooooooooooooooooooooooooooLong',
  name: '田中太郎'
}
const stubResponseBodyEmpty = undefined
const apiHost = 'http://localhost'
const path = '/v1/user/self'

describe('fetchClientsSearch', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  describe('正常系', () => {
    test.each`
      status | response            | expected            | description
      ${200} | ${stubResponseBody} | ${stubResponseBody} | ${'正常にレスポンスが返却される場合、会員情報が正常に返却される'}
    `('$description', async ({ status, response, expected }) => {
      nock(apiHost)
        .get(path)
        .matchHeader('Authorization', 'Bearer stub-token')
        .reply(status, response)

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
      nock(apiHost)
        .get(path)
        .matchHeader('Authorization', 'Bearer stub-token')
        .reply(status, response)

      await expect(fetchMy([path, 'stub-token'])).rejects.toThrow(expected)
    })
  })
})
