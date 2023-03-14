import { rest } from 'msw'
import { getConfig } from '../../../functions/config'
import { samples } from '../fixtures/samples'

const { apiHost } = getConfig()

export const handlers = {
  default: rest.get(`${apiHost}/v1/user/self`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(samples['200']))
  }),
  error: rest.get(`${apiHost}/v1/user/self`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ errorMessage: 'internal server error' }))
  })
}
