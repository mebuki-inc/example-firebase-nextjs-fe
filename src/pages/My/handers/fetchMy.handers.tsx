import { rest } from 'msw'
import { getConfig } from '../../../functions/config'

const { apiHost } = getConfig()
// const apiHost = 'http://localhost'

export const handlers = {
  default: rest.get(`${apiHost}/v1/user/self`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ userName: '田中太郎' }))
  }),
  error: rest.get(`${apiHost}/v1/user/self`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ errorMessage: 'internal server error' }))
  })
}
