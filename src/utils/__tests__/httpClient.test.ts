import nock from 'nock'
import { mocked } from 'jest-mock'

import { getConfig } from '../config'
import { fetch, mutate } from '../httpClient'

jest.mock('../config')

const mockedGetConfig = mocked(getConfig)

const params = { status: 'enable' }
const body = { name: 'test', age: 32 }
const requestHeader = { 'X-Request-Id': 'request-id' }

const stubResponseHeaders = {
  'access-control-allow-origin': '*',
  'access-control-request-method': 'GET, POST, PUT, DELETE, OPTIONS',
  'content-type': 'application/json'
}

const badRequest = {
  status: 400,
  headers: stubResponseHeaders,
  error: true
}

const internalServerError = {
  status: 500,
  headers: stubResponseHeaders,
  error: true
}

const apiHostNotFound = {
  status: 0,
  error: true
}

describe('httpClient', () => {
  beforeEach(() => {
    nock.cleanAll()
  })

  describe('fetch', () => {
    const stubResponseBody = { id: 1, name: 'test' }

    const success = {
      status: 200,
      body: stubResponseBody,
      headers: stubResponseHeaders,
      error: false
    }

    test.each`
      apiHost               | path               | requestHeaders   | params    | status | responseHeader         | res                 | expected               | description
      ${'http://localhost'} | ${'/api/v1/users'} | ${requestHeader} | ${params} | ${200} | ${stubResponseHeaders} | ${stubResponseBody} | ${success}             | ${'正常にレスポンスが返却される場合、{ status, body, headers, error: false } が正常に返却される'}
      ${'http://localhost'} | ${'/api/v1/users'} | ${requestHeader} | ${params} | ${400} | ${stubResponseHeaders} | ${null}             | ${badRequest}          | ${'BadRequestが返却される場合、{ status: 400, headers, error: true } が正常に返却される'}
      ${'http://localhost'} | ${'/api/v1/users'} | ${requestHeader} | ${params} | ${500} | ${stubResponseHeaders} | ${null}             | ${internalServerError} | ${'InternalServerErrorが返却される場合、{ status: 500, headers, error: true } が正常に返却される'}
      ${''}                 | ${'/api/v1/users'} | ${requestHeader} | ${params} | ${200} | ${stubResponseHeaders} | ${stubResponseBody} | ${apiHostNotFound}     | ${'apiHostが取得できない場合、{ status: 0, error: true } が正常に返却される'}
    `('$description', async ({ apiHost, path, requestHeaders, params, status, res, expected }) => {
      nock('http://localhost')
        .get(path)
        .query(params)
        .matchHeader('X-Request-Id', 'request-id')
        .reply(status, res, stubResponseHeaders)
      mockedGetConfig.mockReturnValue({ apiHost } as any)

      const actual = await fetch<typeof res>(path, requestHeaders, params)
      expect(actual).toEqual(expected)
    })
  })

  describe('mutate', () => {
    const stubMutateResponseBody = { status: 'success' }

    const success = {
      status: 200,
      body: stubMutateResponseBody,
      headers: stubResponseHeaders,
      error: false
    }

    test.each`
      apiHost               | method      | path                 | requestHeaders   | body    | status | responseHeader         | res                       | expected               | description
      ${'http://localhost'} | ${'post'}   | ${'/api/v1/users'}   | ${requestHeader} | ${body} | ${200} | ${stubResponseHeaders} | ${stubMutateResponseBody} | ${success}             | ${'POSTに成功した場合、{ status, body: null, headers, error: false } が正常に返却される'}
      ${'http://localhost'} | ${'put'}    | ${'/api/v1/users/1'} | ${requestHeader} | ${body} | ${200} | ${stubResponseHeaders} | ${stubMutateResponseBody} | ${success}             | ${'PUTに成功した場合、{ status, body: null, headers, error: true } が正常に返却される'}
      ${'http://localhost'} | ${'patch'}  | ${'/api/v1/users/1'} | ${requestHeader} | ${body} | ${200} | ${stubResponseHeaders} | ${stubMutateResponseBody} | ${success}             | ${'PATCHに成功した場合、{ status, body: null, headers, error: true } が正常に返却される'}
      ${'http://localhost'} | ${'delete'} | ${'/api/v1/users/1'} | ${requestHeader} | ${body} | ${200} | ${stubResponseHeaders} | ${stubMutateResponseBody} | ${success}             | ${'DELETEに成功した場合、{ status, body: null, headers, error: true } が正常に返却される'}
      ${'http://localhost'} | ${'post'}   | ${'/api/v1/users/1'} | ${requestHeader} | ${body} | ${400} | ${stubResponseHeaders} | ${stubMutateResponseBody} | ${badRequest}          | ${'BadRequestが返却される場合、{ status: 400, headers, error: true } が正常に返却される'}
      ${'http://localhost'} | ${'put'}    | ${'/api/v1/users/1'} | ${requestHeader} | ${body} | ${500} | ${stubResponseHeaders} | ${stubMutateResponseBody} | ${internalServerError} | ${'InternalServerErrorが返却される場合、{ status: 500, headers, error: true } が正常に返却される'}
      ${''}                 | ${'patch'}  | ${'/api/v1/users/1'} | ${requestHeader} | ${body} | ${200} | ${stubResponseHeaders} | ${stubMutateResponseBody} | ${apiHostNotFound}     | ${'apiHostが取得できない場合、{ status: 0, error: true } が正常に返却される'}
    `(
      '$description',
      async ({ apiHost, method, path, requestHeaders, body, status, res, expected }) => {
        nock('http://localhost')
          .intercept(path, method.toUpperCase())
          .delayBody(body)
          .matchHeader('X-Request-Id', 'request-id')
          .reply(status, res, stubResponseHeaders)
        mockedGetConfig.mockReturnValue({ apiHost } as any)

        const actual = await mutate<typeof body, typeof res>(method, path, requestHeaders, params)
        expect(actual).toEqual(expected)
      }
    )
  })
})
