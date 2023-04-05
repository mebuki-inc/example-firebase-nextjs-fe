import { rest } from 'msw'
import { getConfig } from '@/src/functions/config'
import { fetchMySamples } from './fetchMy.samples'

const { apiHost } = getConfig()

export const fetchMyHandlers = {
  default: rest.get(`${apiHost}/v1/user/self`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(fetchMySamples['200']))
  }),
  //　通常返却されるべき値を返却しないことでloading状態を偽装する
  loading: rest.get(`${apiHost}/v1/user/self`, (req, res, ctx) => new Promise(() => undefined)),
  error: rest.get(`${apiHost}/v1/user/self`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ errorMessage: 'internal server error' }))
  })
}
