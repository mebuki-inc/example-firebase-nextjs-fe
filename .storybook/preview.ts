import type { Preview } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { withNextRouter } from '@gogaille/storybook-addon-next-router'

// Initialize MSW
if (!global.test) {
  // only run this in the browser
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

export const decorators = [mswDecorator, withNextRouter]
