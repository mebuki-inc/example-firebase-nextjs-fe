import type { Preview } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'

if (!global.test) {
  initialize()
}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light'
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview

export const decorators = [mswDecorator]
