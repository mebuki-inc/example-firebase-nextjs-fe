const config = require('../main')
// ToDo: sb@7でdeprecated
import { configure } from '@storybook/react'

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { myProp: 'myValue' }
  })
}))

const req = require.context('../../src', true, /\.stories\.tsx$/)
configure(req, module)

module.exports = {
  ...config,
  addons: ['@storybook/preset-create-react-app']
  // CSF形式のstoryがひっかからないので一旦前のやり方で
  // stories: ['../../src/components/**/__stories__/*.stories.tsx']
}
